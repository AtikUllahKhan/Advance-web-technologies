import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliveryAgent } from './entities/DeliveryAgent.entity';
import { Repository } from 'typeorm';
import { CreateDeliveryAgentDto } from './dto/create-deliveryAgent.dto';
import * as bcrypt from 'bcrypt';
import { UpdateDeliveryAgentDto } from './dto/update-deliveryAgent.dto';
import * as jwt from 'jsonwebtoken';
import { EmailService } from 'src/email/email.service';


@Injectable()
export class DeliveryAgentService {
  private otpStorage = new Map<string, { otp: string; expiresAt: Date }> (); 

    constructor(
              @InjectRepository(DeliveryAgent) // Inject the User repository
              private readonly deliveryAgentRepository: Repository<DeliveryAgent>,
              private readonly emailService: EmailService,

            ) {}
            
            // Show All Admin
            async findAll(): Promise<DeliveryAgent[]> {
              return await this.deliveryAgentRepository.find();
            }
      
            // Delivery Agent Search using ID
            async findOne(id:number): Promise<DeliveryAgent>{
              return await this.deliveryAgentRepository.findOne({where: {id}});
            }
      
            // Create DeliveryAgent
            async createDeliveryAgent(createDeliveryAgentDto: CreateDeliveryAgentDto): Promise<DeliveryAgent> {
              const deliveryAgent = this.deliveryAgentRepository.create(createDeliveryAgentDto);
              return await this.deliveryAgentRepository.save(deliveryAgent);
            }
      
            // Update DeliveryAgent
            async updateDeliveryAgent(id: number, updateDeliveryAgentDto: UpdateDeliveryAgentDto): Promise<DeliveryAgent> {
            if (!updateDeliveryAgentDto || Object.keys(updateDeliveryAgentDto).length === 0) {
              throw new BadRequestException('No fields provided for update');
            }
              
            const existingDeliveryAgent = await this.deliveryAgentRepository.findOne({ where: { id } });
            if (!existingDeliveryAgent) {
              throw new NotFoundException(`Delivery Agent with ID ${id} not found`);
            }
              
            await this.deliveryAgentRepository.update(id, updateDeliveryAgentDto);
              
            return this.deliveryAgentRepository.findOne({ where: { id } });
            }
      
            // Delete Delivery Agent
            async deleteDeliveryAgent(id: number): Promise<void> {
              const deleteResult = await this.deliveryAgentRepository.delete(id);
          
              if (!deleteResult.affected) {
                throw new NotFoundException(`Delivery Agent with ID ${id} not found`);
              }
            }
      
            async register(createDeliveryAgentDto: CreateDeliveryAgentDto): Promise<{ message: string ; DeliveryAgent}> {
              const { deliveryAgentname, phonenumber, email, address, vehicleType, password } = createDeliveryAgentDto;
          
              // Check if email is already registered
              const existingDeliveryAgent = await this.deliveryAgentRepository.findOne({ where: { email } });
              if (existingDeliveryAgent) {
                throw new BadRequestException('Email is already registered');
              }
               //Generate an OTP
               const otp = Math.floor(100000 + Math.random() * 900000).toString();
               const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
               
               //Store OTP in memory(or database for presistence)
               this.otpStorage.set(email, { otp, expiresAt });
 
               // Hash the password
               const saltOrRounds = 10;
               const hashedPassword = await bcrypt.hash(password, saltOrRounds);
              
              // Save the admin
              const deliveryAgent = this.deliveryAgentRepository.create({
                deliveryAgentname,
                phonenumber,
                email,
                address,
                vehicleType,
                password: hashedPassword,
                isVerified: false,
              });
              
              //Send OTP email
              const registerDeliveryAgent = await this.deliveryAgentRepository.save(deliveryAgent);
              const emailSubject = 'Verify your Registration';
              const emailText = `Hi ${deliveryAgentname}, your OTP for registration is ${otp}. Its is valid for 10 minutes`;
              await this.emailService.sendEmail(email, emailSubject, emailText);
          
              return { message: 'OTP sent to your email. Please verify to complete registration.', DeliveryAgent:registerDeliveryAgent};
            }

           //Verify OTP and make vendor as verifief
            async verifyOTP(email: string, otp: string): Promise<{message: string}> {
            const otpData = this.otpStorage.get(email);

            if(!otpData) {
              throw new BadRequestException('No OTP found or OTP expired');
            }

            if(otpData.otp !== otp) {
              throw new BadRequestException('Invalid OTP');
            }

            if(otpData.expiresAt < new Date()) {
              throw new BadRequestException('OTP has expired')
            }

            //Make Delivery Agent as verified
            const deliveryAgent = await this.deliveryAgentRepository.findOne({ where: { email} });
            if(!deliveryAgent) {
              throw new NotFoundException('Delivery Agent not found');
            }

            deliveryAgent.isVerified = true;
            await this.deliveryAgentRepository.save(deliveryAgent);

            //Remove OTP from storage
            this.otpStorage.delete(email);

            //Send confirmation email
            const emailSubject = 'Registration Successful';
            const emailText = `Hi ${deliveryAgent.deliveryAgentname}, your registration is now complete and you you Id is ${deliveryAgent.id}. Welcome to QuadraCart Family!`;
            await this.emailService.sendEmail(email, emailSubject, emailText);

              //const registerDeliveryAgent = await this.deliveryAgentRepository.save(deliveryAgent);
              return { message: 'DeliveryAgent registered successfully'};
            }
            async login(id: number, password: string) {
                    // Find admin by email
            const deliveryAgent = await this.deliveryAgentRepository.findOne({ where: { id } });
                
            if (!deliveryAgent) {
              throw new NotFoundException('Delivery Agent not found');
            }
                
            // Validate password
            const isPasswordValid = await bcrypt.compare(password, deliveryAgent.password);
            if (!isPasswordValid) {
              throw new UnauthorizedException('Invalid password');
            }
                
            // Return admin details (excluding password for security reasons)
            const payload = { id: deliveryAgent.id, email: deliveryAgent.email };
            const token = jwt.sign(payload, 'your-secret-key', { expiresIn: '1h' });
            const { password: _, ...deliveryAgentDetails } = deliveryAgent;
            return {message: `Delivery Agent ${id} Login successfully`, deliveryAgentDetails,token};
            }
}

import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vendor } from './entities/vendor.entity';
import { Repository } from 'typeorm';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { EmailService } from 'src/email/email.service';


@Injectable()
export class VendorService {
  private otpStorage = new Map<string, { otp: string; expiresAt: Date }> (); 

      constructor(
              @InjectRepository(Vendor) // Inject the User repository
              private readonly vendorRepository: Repository<Vendor>,
              private readonly emailService: EmailService,

            ) {}
            
            // Show All Vendor
            async findAll(): Promise<Vendor[]> {
              return await this.vendorRepository.find();
            }
      
            // Vendor Search using ID
            async findOne(id:number): Promise<Vendor>{
              return await this.vendorRepository.findOne({where: {id}});
            }
      
            // Create Vendor
            async createCustomer(createCustomerDto: CreateVendorDto): Promise<Vendor> {
              const vendor = this.vendorRepository.create(createCustomerDto);
              return await this.vendorRepository.save(vendor);
            }
      
            // Update Vendor
            async updateVendor(id: number, updateVendorDto: UpdateVendorDto): Promise<Vendor> {
            if (!updateVendorDto || Object.keys(updateVendorDto).length === 0) {
              throw new BadRequestException('No fields provided for update');
            }
              
            const existingVendor = await this.vendorRepository.findOne({ where: { id } });
            if (!existingVendor) {
              throw new NotFoundException(`Vendor with ID ${id} not found`);
            }
              
            await this.vendorRepository.update(id, updateVendorDto);
              
            return this.vendorRepository.findOne({ where: { id } });
            }
      
            // Delete Vendor 
            async deleteVendor(id: number): Promise<void> {
              const deleteResult = await this.vendorRepository.delete(id);
          
              if (!deleteResult.affected) {
                throw new NotFoundException(`Vendor with ID ${id} not found`);
              }
            }
      
            async register(createVendorDto: CreateVendorDto): Promise<{ message: string ; Vendor}> {
              const { vendorname, phonenumber, email, location, password } = createVendorDto;
          
              // Check if email is already registered
              const existingVendor = await this.vendorRepository.findOne({ where: { email } });
              if (existingVendor) {
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
          
              // Save the vendor
              const vendor = this.vendorRepository.create({
                vendorname,
                phonenumber,
                email,
                location,
                password: hashedPassword,
                isVerified: false,
              });
              
              //Send OTP email
              const registerVendor = await this.vendorRepository.save(vendor);
              const emailSubject = 'Verify your Registration';
              const emailText = `Hi ${vendorname}, your OTP for registration is ${otp}. Its is valid for 10 minutes`;
              await this.emailService.sendEmail(email, emailSubject, emailText);
          
              return { message: 'OTP sent to your email. Please verify to complete registration.', Vendor:registerVendor};
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

            //Make vendor as verified
            const vendor = await this.vendorRepository.findOne({ where: { email} });
            if(!vendor) {
              throw new NotFoundException('Vendor not found');
            }

            vendor.isVerified = true;
            await this.vendorRepository.save(vendor);

            //Remove OTP from storage
            this.otpStorage.delete(email);

            //Send confirmation email
            const emailSubject = 'Registration Successful';
            const emailText = `Hi ${vendor.vendorname}, your registration is now complete and you you Id is ${vendor.id}. Welcome to QuadraCart Family!`;
            await this.emailService.sendEmail(email, emailSubject, emailText);

              
            //  const registerVendor = await this.vendorRepository.save(vendor);
              return { message: 'Vendor registered successfully'};
            }

          async login(id: number, password: string) {
                    // Find admin by email
            const vendor = await this.vendorRepository.findOne({ where: { id } });
                
            if (!vendor) {
              throw new NotFoundException('Vendor not found');
            }
            
            // Validate password
            const isPasswordValid = await bcrypt.compare(password, vendor.password);
           if (!isPasswordValid) {
             throw new UnauthorizedException('Invalid password');
           }
                
          // Return admin details (excluding password for security reasons)
          const payload = { id: vendor.id, email: vendor.email };
          const token = jwt.sign(payload, 'your-secret-key', { expiresIn: '1h' });
          const { password: _, ...vendorDetails } = vendor;
          return {message: `Vendor ${id} Login successfully`, vendorDetails,token};
          }
            
    }
    
    


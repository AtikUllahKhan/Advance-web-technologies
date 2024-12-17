import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliveryAgent } from './entities/DeliveryAgent.entity';
import { Repository } from 'typeorm';
import { CreateDeliveryAgentDto } from './dto/create-deliveryAgent.dto';
import * as bcrypt from 'bcrypt';
import { UpdateDeliveryAgentDto } from './dto/update-deliveryAgent.dto';

@Injectable()
export class DeliveryAgentService {
    constructor(
              @InjectRepository(DeliveryAgent) // Inject the User repository
              private readonly deliveryAgentRepository: Repository<DeliveryAgent>,
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
      
            // Delete Admin 
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
              // Hash the password
              const hashedPassword = await bcrypt.hash(password, 10);
          
              // Save the admin
              const deliveryAgent = this.deliveryAgentRepository.create({
                deliveryAgentname,
                phonenumber,
                email,
                address,
                vehicleType,
                password: hashedPassword,
              });
          
              const registerDeliveryAgent = await this.deliveryAgentRepository.save(deliveryAgent);
              return { message: 'DeliveryAgent registered successfully', DeliveryAgent:registerDeliveryAgent};
            }
}

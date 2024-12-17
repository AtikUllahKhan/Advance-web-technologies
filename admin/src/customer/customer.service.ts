import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/Customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import * as bcrypt from 'bcrypt';

   

@Injectable()
export class CustomerService {
   
  constructor(
          @InjectRepository(Customer) // Inject the User repository
          private readonly customerRepository: Repository<Customer>,
        ) {}
        
        // Show All Admin
        async findAll(): Promise<Customer[]> {
          return await this.customerRepository.find();
        }
  
        // Admin Search using ID
        async findOne(id:number): Promise<Customer>{
          return await this.customerRepository.findOne({where: {id}});
        }
  
        // Create Admin
        async createCustomer(createCustomerDto: CreateCustomerDto): Promise<Customer> {
          const customer = this.customerRepository.create(createCustomerDto);
          return await this.customerRepository.save(customer);
        }
  
        // Update Admin
        async updateCustomer(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
        if (!updateCustomerDto || Object.keys(updateCustomerDto).length === 0) {
          throw new BadRequestException('No fields provided for update');
        }
          
        const existingCustomer = await this.customerRepository.findOne({ where: { id } });
        if (!existingCustomer) {
          throw new NotFoundException(`Customer with ID ${id} not found`);
        }
          
        await this.customerRepository.update(id, updateCustomerDto);
          
        return this.customerRepository.findOne({ where: { id } });
        }
  
        // Delete Admin 
        async deleteCustomer(id: number): Promise<void> {
          const deleteResult = await this.customerRepository.delete(id);
      
          if (!deleteResult.affected) {
            throw new NotFoundException(`Customer with ID ${id} not found`);
          }
        }
  
        async register(createCustomerDto: CreateCustomerDto): Promise<{ message: string ; Customer}> {
          const { name, phonenumber, email, address, password } = createCustomerDto;
      
          // Check if email is already registered
          const existingCustomer = await this.customerRepository.findOne({ where: { email } });
          if (existingCustomer) {
            throw new BadRequestException('Email is already registered');
          }
          // Hash the password
          const hashedPassword = await bcrypt.hash(password, 10);
      
          // Save the admin
          const vendor = this.customerRepository.create({
            name,
            phonenumber,
            email,
            address,
            password: hashedPassword,
          });
      
          const registerCustomer = await this.customerRepository.save(vendor);
          return { message: 'Customer registered successfully', Customer:registerCustomer};
        }
        /*
        async login(id: number, password: string) {
          // Find admin by email
          const customer = await this.customerRepository.findOne({ where: { id } });
      
          if (!customer) {
            throw new NotFoundException('customer not found');
          }
      
          // Validate password
          const isPasswordValid = await bcrypt.compare(password, customer.password);
          if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid password');
          }
      
          // Return admin details (excluding password for security reasons)
          const { password: _, ...customerDetails } = customer;
          return {message: `Admin ${id} Login successfully`, customerDetails};
        }*/

}


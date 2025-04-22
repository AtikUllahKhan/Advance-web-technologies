import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/Customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { EmailService } from 'src/email/email.service';
   

@Injectable()
export class CustomerService {
  private otpStorage = new Map<string, { otp: string; expiresAt: Date }> (); 

  constructor(
          @InjectRepository(Customer) // Inject the User repository
          private readonly customerRepository: Repository<Customer>,
          private readonly emailService: EmailService,

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
           //Generate an OTP
           const otp = Math.floor(100000 + Math.random() * 900000).toString();
           const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
           
           //Store OTP in memory(or database for presistence)
           this.otpStorage.set(email, { otp, expiresAt });

           // Hash the password
           const saltOrRounds = 10;
           const hashedPassword = await bcrypt.hash(password, saltOrRounds);
          
          // Save the admin
          const customer = this.customerRepository.create({
            name,
            phonenumber,
            email,
            address,
            password: hashedPassword,
            isVerified: false,
          });
          //Send OTP email
          const registerCustomer = await this.customerRepository.save(customer);
          const emailSubject = 'Verify your Registration';
          const emailText = `Hi ${name}, your OTP for registration is ${otp}. Its is valid for 10 minutes`;
          await this.emailService.sendEmail(email, emailSubject, emailText);
      
          return { message: 'OTP sent to your email. Please verify to complete registration.', Customer:registerCustomer};
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

        //Make customer as verified
        const customer = await this.customerRepository.findOne({ where: { email} });
        if(!customer) {
          throw new NotFoundException('Customer not found');
        }

        customer.isVerified = true;
        await this.customerRepository.save(customer);

        //Remove OTP from storage
        this.otpStorage.delete(email);

        //Send confirmation email
        const emailSubject = 'Registration Successful';
        const emailText = `Hi ${customer.name}, your registration is now complete and you you Id is ${customer.id}. Welcome to QuadraCart Family !`;
        await this.emailService.sendEmail(email, emailSubject, emailText);


      
          //const registerCustomer = await this.customerRepository.save(vendor);
          return { message: 'Customer registered successfully'};
        }
        async login(id: number, password: string) {
                // Find Customer by email
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
                const payload = { id: customer.id, email: customer.email };
               const token = jwt.sign(payload, 'your-secret-key', { expiresIn: '1h' });
                const { password: _, ...customerDetails } = customer;
                return {message: `Customer ${id} Login successfully`,customerDetails,token};
              }
        

}


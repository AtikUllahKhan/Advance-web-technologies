import { BadRequestException, Body, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Admin } from './entities/Admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/Update-admin.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { LoginDto } from './dto/login.dto';
import { EmailService } from 'src/email/email.service';
//import { EmailService } from 'src/email/email.service';


@Injectable()
export class AdminService { 
  private otpStorage = new Map<string, { otp: string; expiresAt: Date }> (); 


    constructor(
        @InjectRepository(Admin) // Inject the User repository
        private readonly adminRepository: Repository<Admin>,
        private readonly emailService: EmailService,
      ) {}
      
      // Show All Admin
      async findAll(): Promise<Admin[]> {
        return await this.adminRepository.find();
      }

      // Admin Search using ID
      // async findOne(id: number): Promise<Admin> {
      //   if (isNaN(id)) {
      //     throw new BadRequestException('Invalid ID provided');
      //   }
      
      //   return await this.adminRepository.findOne({ where: { id } });
      // }
      

      // Create Admin
      async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
        const admin = this.adminRepository.create(createAdminDto);
        return await this.adminRepository.save(admin);
      }

      // Update Admin
      async updateAdmin(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin> {
      if (!updateAdminDto || Object.keys(updateAdminDto).length === 0) {
        throw new BadRequestException('No fields provided for update');
      }
        
      const existingAdmin = await this.adminRepository.findOne({ where: { id } });
      if (!existingAdmin) {
        throw new NotFoundException(`Admin with ID ${id} not found`);
      }
        
      await this.adminRepository.update(id, updateAdminDto);
        
      return this.adminRepository.findOne({ where: { id } });
      }

      // Delete Admin 
      async deleteAdmin(id: number): Promise<void> {
        const deleteResult = await this.adminRepository.delete(id);
    
        if (!deleteResult.affected) {
          throw new NotFoundException(`Admin with ID ${id} not found`);
        }
      }

      async register(createAdminDto: CreateAdminDto): Promise<{ message: string ; Admin}> {
        const { name, email, password } = createAdminDto;
    
        // Check if email is already registered
        const existingAdmin = await this.adminRepository.findOne({ where: { email } });
        if (existingAdmin) {
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
        const admin = this.adminRepository.create({
          name,
          email,
          password: hashedPassword,
          isVerified: false,
        });
     //Send OTP email
        const registerAdmin = await this.adminRepository.save(admin);
        const emailSubject = 'Verify your Registration';
        const emailText = `Hi ${name}, your OTP for registration is ${otp}. Its is valid for 10 minutes`;
        await this.emailService.sendEmail(email, emailSubject, emailText);
 
        return { message: 'OTP sent to your email. Please verify to complete registration.', Admin:registerAdmin};
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
      const admin = await this.adminRepository.findOne({ where: { email} });
       if(!admin) {
         throw new NotFoundException('Admin not found');
       }

       admin.isVerified = true;
       await this.adminRepository.save(admin);

      //Remove OTP from storage
       this.otpStorage.delete(email);

       //Send confirmation email
       const emailSubject = 'Registration Successful';
       const emailText = `Hi ${admin.name}, your registration is now complete and you you Id is ${admin.id}. Welcome to QuadraCart Family !`;
       await this.emailService.sendEmail(email, emailSubject, emailText);
        //const registerAdmin = await this.adminRepository.save(admin);

    
        return { message: 'Admin registered successfully. Please check your email for confirmation.'};
      }

      

      
      async login(id: number, password: string) {
        // Find admin by email
        const admin = await this.adminRepository.findOne({ where: { id } });
    
        if (!admin) {
          throw new NotFoundException('Admin not found');
        }
    
        // Validate password
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
          throw new UnauthorizedException('Invalid password');
        }
    
        // Return admin details (excluding password for security reasons)
        const payload = { id: admin.id, email: admin.email };
       const token = jwt.sign(payload, 'your-secret-key', { expiresIn: '1h' });
        const { password: _, ...adminDetails } = admin;
        return {message: `Admin ${id} Login successfully`, adminDetails,token};
      }
     
      async getUserProfile(userId: number) {
        const user = await this.adminRepository.findOne({ where: { id: userId } });
      
        if (!user) {
          throw new NotFoundException('Admin not found');
        }
      
        return {
       
          name: user.name,
          
          email: user.email,
          
        };
      }

      async updateprofile(userId: number, updatedData: Partial<UpdateAdminDto>) {
        const user = await this.adminRepository.findOne({ where: { id: userId } });
    
        if (!user) {
          throw new Error('Customer not found');
        }
    
        // Update the user profile
        const updatedUser = this.adminRepository.merge(user, updatedData);
        return await this.adminRepository.save(updatedUser);
      }



}

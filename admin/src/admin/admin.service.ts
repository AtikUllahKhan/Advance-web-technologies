import { BadRequestException, Body, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Admin } from './entities/Admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/Update-admin.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AdminService {
    

    constructor(
        @InjectRepository(Admin) // Inject the User repository
        private readonly adminRepository: Repository<Admin>,
      ) {}
      
      // Show All Admin
      async findAll(): Promise<Admin[]> {
        return await this.adminRepository.find();
      }

      // Admin Search using ID
      async findOne(id:number): Promise<Admin>{
        return await this.adminRepository.findOne({where: {id}});
      }

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
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Save the admin
        const admin = this.adminRepository.create({
          name,
          email,
          password: hashedPassword,
        });
    
        const registerAdmin = await this.adminRepository.save(admin);
        return { message: 'Admin registered successfully', Admin:registerAdmin};
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
    

}




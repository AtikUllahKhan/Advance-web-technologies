import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vendor } from './entities/vendor.entity';
import { Repository } from 'typeorm';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class VendorService {
   
      constructor(
              @InjectRepository(Vendor) // Inject the User repository
              private readonly vendorRepository: Repository<Vendor>,
            ) {}
            
            // Show All Admin
            async findAll(): Promise<Vendor[]> {
              return await this.vendorRepository.find();
            }
      
            // Admin Search using ID
            async findOne(id:number): Promise<Vendor>{
              return await this.vendorRepository.findOne({where: {id}});
            }
      
            // Create Admin
            async createCustomer(createCustomerDto: CreateVendorDto): Promise<Vendor> {
              const vendor = this.vendorRepository.create(createCustomerDto);
              return await this.vendorRepository.save(vendor);
            }
      
            // Update Admin
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
              // Hash the password
              const hashedPassword = await bcrypt.hash(password, 10);
          
              // Save the admin
              const vendor = this.vendorRepository.create({
                vendorname,
                phonenumber,
                email,
                location,
                password: hashedPassword,
              });
          
              const registerVendor = await this.vendorRepository.save(vendor);
              return { message: 'Vendor registered successfully', Vendor:registerVendor};
            }
            
    }
    
    


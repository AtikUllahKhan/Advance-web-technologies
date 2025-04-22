import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Vendor } from './entities/vendor.entity';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';

@Controller('vendor')
export class VendorController {
    
      constructor(private readonly vendorService: VendorService) {}
    
          @UseGuards(AuthGuard)
          @Get()
          async findAll():Promise<Vendor[]>{
              return this.vendorService.findAll();
          }
          @UseGuards(AuthGuard)
          @Get(':id')
          async findOne(@Param('id') id:number): Promise<Vendor>{
              return this.vendorService.findOne(+id);
          }
          @UseGuards(AuthGuard)
          @Post('add')
          async createVendor(@Body()createVendorDto: CreateVendorDto): Promise<{message: string; Vendor}>{
      
              //return this.adminService.createAdmin(createAdminDto);
              const createVendor = await this.vendorService.createCustomer(createVendorDto);
              return {message: 'Vendor added successfully',Vendor:createVendor};
          }
    
          @UseGuards(AuthGuard)
          @Put(':id')
          async updateVendor(@Param('id') id: number, @Body() updateVendorDto: UpdateVendorDto,): Promise<{message: string; Vendor}> {
      
              if (isNaN(id)) {
                  throw new BadRequestException('Invalid ID');
              }
              const updatedVendor = await this.vendorService.updateVendor(+id, updateVendorDto);
      
              return {message: `Vendor ID ${id} updated successfully`,Vendor:updatedVendor};
      
              //return this.adminService.updateAdmin(id, updateAdminDto);
      
          }
      
          @UseGuards(AuthGuard)
          @Delete(':id')
          async deleteVendor(@Param('id') id: number): Promise<{ message: string }> {
              
              if (isNaN(id)) {
                  throw new BadRequestException('Invalid ID');
              }
          
              await this.vendorService.deleteVendor(+id);
              return { message: `Vendor ID ${id} deleted successfully` };
          }
    
          //@UseGuards(AuthGuard)
          @Post('register')
          async register(@Body() createVendorDto: CreateVendorDto) {
      
              return this.vendorService.register(createVendorDto);
          }

          @Post('verify-otp')
          async verifyOTP(@Body('email') email: string, @Body('otp') otp: string) {
            return this.vendorService.verifyOTP(email, otp);
          }
          
          @Post('login')
          async login(@Body('id') id: number, @Body('password') password: string) {
      
              return await this.vendorService.login(id, password);
          }
         
    }
    
    
    
    
    


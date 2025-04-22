import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from './entities/Admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/Update-admin.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from 'src/auth/auth.guard';


@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}
    @UseGuards(AuthGuard)
    @Get()
    async findAll():Promise<Admin[]>{
        return this.adminService.findAll();
    }
    
//     @UseGuards(AuthGuard)
// @Get(':id')
// async findOne(@Param('id') id: number): Promise<Admin> {
//   if (isNaN(id)) {
//     throw new BadRequestException('Invalid ID provided');
//   }
//   return this.adminService.findOne(id);
// }

    @UseGuards(AuthGuard)
    @Post('add')
    async createAdmin(@Body()createAdminDto: CreateAdminDto): Promise<{message: string; Admin}>{

        //return this.adminService.createAdmin(createAdminDto);
        const createadmin = await this.adminService.createAdmin(createAdminDto);
        return {message: 'Admin added successfully',Admin:createadmin};
    }
    @UseGuards(AuthGuard)
    @Put(':id')
    async updateAdmin(@Param('id') id: number, @Body() updateAdminDto: UpdateAdminDto,): Promise<{message: string; Admin}> {

        if (isNaN(id)) {
            throw new BadRequestException('Invalid ID');
        }
        const updatedAdmin = await this.adminService.updateAdmin(+id, updateAdminDto);

        return {message: `Admin ID ${id} updated successfully`,Admin:updatedAdmin};

        //return this.adminService.updateAdmin(id, updateAdminDto);

    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteAdmin(@Param('id') id: number): Promise<{ message: string }> {
        
        if (isNaN(id)) {
            throw new BadRequestException('Invalid ID');
        }
    
        await this.adminService.deleteAdmin(+id);
        return { message: `Admin ID ${id} deleted successfully` };
    }

    @Post('register')
    async register(@Body() createAdminDto: CreateAdminDto) {

        return this.adminService.register(createAdminDto);
    }

    @Post('verify-otp')
          async verifyOTP(@Body('email') email: string, @Body('otp') otp: string) {
            return this.adminService.verifyOTP(email, otp);
          }

    @Post('login')
    async login(@Body('id') id: number, @Body('password') password: string) {

        return await this.adminService.login(id, password);
    }
    @UseGuards(AuthGuard)
    @Get('/profile')
    async getProfile(@Req() req: any) {
      const userId = req.user.id; // Extract user ID from decoded token
      if (!userId) {
        throw new BadRequestException('Invalid ID provided');
      }
      return await this.adminService.getUserProfile(userId);
    }
    
@UseGuards(AuthGuard)
@Patch('/update')
async updateProfile(@Body() updatedData: Partial<UpdateAdminDto>, @Req() req: any) {
  const userId = req.user.id; // Extract user ID from the decoded token
  return await this.adminService.updateprofile(userId, updatedData);
}
        
}

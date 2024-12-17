import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from './entities/Admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/Update-admin.dto';
import { LoginDto } from './dto/login.dto';


@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}
    @Get()
    async findAll():Promise<Admin[]>{
        return this.adminService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id:number): Promise<Admin>{
        return this.adminService.findOne(+id);
    }

    @Post('add')
    async createAdmin(@Body()createAdminDto: CreateAdminDto): Promise<{message: string; Admin}>{

        //return this.adminService.createAdmin(createAdminDto);
        const createadmin = await this.adminService.createAdmin(createAdminDto);
        return {message: 'Admin added successfully',Admin:createadmin};
    }

    @Put(':id')
    async updateAdmin(@Param('id') id: number, @Body() updateAdminDto: UpdateAdminDto,): Promise<{message: string; Admin}> {

        if (isNaN(id)) {
            throw new BadRequestException('Invalid ID');
        }
        const updatedAdmin = await this.adminService.updateAdmin(+id, updateAdminDto);

        return {message: `Admin ID ${id} updated successfully`,Admin:updatedAdmin};

        //return this.adminService.updateAdmin(id, updateAdminDto);

    }


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

    @Post('login')
    async login(@Body('id') id: number, @Body('password') password: string) {

        return await this.adminService.login(id, password);
    }
  

        
}

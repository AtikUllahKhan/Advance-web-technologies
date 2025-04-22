import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Put, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Customer } from './entities/Customer.entity';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('customer')
export class CustomerController {

  constructor(private readonly customerService: CustomerService) {}

      @UseGuards(AuthGuard)
      @Get()
      async findAll():Promise<Customer[]>{
          return this.customerService.findAll();
      }
      @UseGuards(AuthGuard)
      @Get(':id')
      async findOne(@Param('id') id:number): Promise<Customer>{
          return this.customerService.findOne(+id);
      }
      @UseGuards(AuthGuard)
      @Post('add')
      async createCustomer(@Body()createCustomerDto: CreateCustomerDto): Promise<{message: string; Customer}>{
  
          //return this.adminService.createAdmin(createAdminDto);
          const createCustomer = await this.customerService.createCustomer(createCustomerDto);
          return {message: 'Customer added successfully',Customer:createCustomer};
      }

      @UseGuards(AuthGuard)
      @Put(':id')
      async updateCustomer(@Param('id') id: number, @Body() updateCustomerDto: UpdateCustomerDto,): Promise<{message: string; Customer}> {
  
          if (isNaN(id)) {
              throw new BadRequestException('Invalid ID');
          }
          const updatedCustomer = await this.customerService.updateCustomer(+id, updateCustomerDto);
  
          return {message: `Customer ID ${id} updated successfully`,Customer:updatedCustomer};
  
          //return this.adminService.updateAdmin(id, updateAdminDto);
  
      }
  
      @UseGuards(AuthGuard)
      @Delete(':id')
      async deleteCustomer(@Param('id') id: number): Promise<{ message: string }> {
          
          if (isNaN(id)) {
              throw new BadRequestException('Invalid ID');
          }
      
          await this.customerService.deleteCustomer(+id);
          return { message: `Customer ID ${id} deleted successfully` };
      }

     // @UseGuards(AuthGuard)
      @Post('register')
      async register(@Body() createCustomerDto: CreateCustomerDto) {
  
          return this.customerService.register(createCustomerDto);
      }
      
      @Post('verify-otp')
      async verifyOTP(@Body('email') email: string, @Body('otp') otp: string) {
        return this.customerService.verifyOTP(email, otp);
      }
      @Post('login')
      async login(@Body('id') id: number, @Body('password') password: string) {

        return await this.customerService.login(id, password);
      }

      /*@Get(':id/orders')
      async getCustomerOrders(@Param('id') customerId: number) {
        return this.customerService.getCustomerOrders(customerId);
      }*/
      
     
}





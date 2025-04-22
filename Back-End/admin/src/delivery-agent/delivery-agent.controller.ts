import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { DeliveryAgent } from './entities/DeliveryAgent.entity';
import { CreateDeliveryAgentDto } from './dto/create-deliveryAgent.dto';
import { DeliveryAgentService } from './delivery-agent.service';

@Controller('delivery-agent')
export class DeliveryAgentController {
    constructor(private readonly deliveryAgentService: DeliveryAgentService) {}
    
          @UseGuards(AuthGuard)
          @Get()
          async findAll():Promise<DeliveryAgent[]>{
              return this.deliveryAgentService.findAll();
          }
          @UseGuards(AuthGuard)
          @Get(':id')
          async findOne(@Param('id') id:number): Promise<DeliveryAgent>{
              return this.deliveryAgentService.findOne(+id);
          }
          @UseGuards(AuthGuard)
          @Post('add')
          async createDeliveryAgent(@Body()createDeliveryAgentDto: CreateDeliveryAgentDto): Promise<{message: string; DeliveryAgent}>{
      
              //return this.adminService.createAdmin(createAdminDto);
              const createDeliveryAgent = await this.deliveryAgentService.createDeliveryAgent(createDeliveryAgentDto);
              return {message: 'Delivery Agent added successfully',DeliveryAgent:createDeliveryAgent};
          }
    
          @UseGuards(AuthGuard)
          @Put(':id')
          async updateDeliveryAgent(@Param('id') id: number, @Body() updateDeliveryAgentDto: CreateDeliveryAgentDto,): Promise<{message: string; DeliveryAgent}> {
      
              if (isNaN(id)) {
                  throw new BadRequestException('Invalid ID');
              }
              const updatedDeliveryAgent = await this.deliveryAgentService.updateDeliveryAgent(+id, updateDeliveryAgentDto);
      
              return {message: `Delivery Agent ID ${id} updated successfully`,DeliveryAgent:updatedDeliveryAgent};
      
              //return this.adminService.updateAdmin(id, updateAdminDto);
      
          }
      
          @UseGuards(AuthGuard)
          @Delete(':id')
          async deleteDeliveryAgent(@Param('id') id: number): Promise<{ message: string }> {
              
              if (isNaN(id)) {
                  throw new BadRequestException('Invalid ID');
              }
          
              await this.deliveryAgentService.deleteDeliveryAgent(+id);
              return { message: `Delivery Agent ID ${id} deleted successfully` };
          }
    
          //@UseGuards(AuthGuard)
          @Post('register')
          async register(@Body() createDeliveryAgentDto: CreateDeliveryAgentDto) {
      
              return this.deliveryAgentService.register(createDeliveryAgentDto);
          }

          @Post('verify-otp')
          async verifyOTP(@Body('email') email: string, @Body('otp') otp: string) {
            return this.deliveryAgentService.verifyOTP(email, otp);
          }

          @Post('login')
          async login(@Body('id') id: number, @Body('password') password: string) {

             return await this.deliveryAgentService.login(id, password);
          }
}

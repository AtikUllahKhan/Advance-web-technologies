// File: MultipleFiles/order.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(createOrderDto);
  }

  @Get(':customerId')
  async findAllOrders(@Param('customerId') customerId: number): Promise<Order[]> {
    return this.orderService.findAllOrders(customerId);
  }

  @Get('vendor/:vendorId')
  async findVendorOrders(@Param('vendorId') vendorId: number): Promise<Order[]> {
    return this.orderService.findVendorOrders(vendorId);
  }
}
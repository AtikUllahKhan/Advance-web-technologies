// File: MultipleFiles/order.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Product } from 'src/product/entity/Product.entity'; // Import Product entity

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>, // Inject Product repository
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    // Fetch the product to get the price
    const product = await this.productRepository.findOne({ where: { id: createOrderDto.productId } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Calculate total based on product price and quantity
    const total = product.price * createOrderDto.quantity; // Assuming quantity is part of the DTO

    const order = this.orderRepository.create({
      ...createOrderDto,
      total, // Set the total amount
      status: 'Pending', // Set initial status
    });

    return await this.orderRepository.save(order);
  }

  async findAllOrders(customerId: number): Promise<Order[]> {
    return await this.orderRepository.find({ where: { customer: { id: customerId } } });
  }

  async findVendorOrders(vendorId: number): Promise<Order[]> {
    return await this.orderRepository.find({ where: { vendor: { id: vendorId } } });
  }
}
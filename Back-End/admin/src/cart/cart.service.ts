// File: MultipleFiles/cart.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  async createCart(createCartDto: CreateCartDto): Promise<Cart> {
    const cart = this.cartRepository.create(createCartDto);
    return await this.cartRepository.save(cart);
  }

  async findAllCarts(customerId: number): Promise<Cart[]> {
    return await this.cartRepository.find({ where: { customer: { id: customerId } } });
  }
}
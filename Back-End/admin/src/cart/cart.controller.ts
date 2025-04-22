// File: MultipleFiles/cart.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { Cart } from './entities/cart.entity';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async createCart(@Body() createCartDto: CreateCartDto): Promise<Cart> {
    return this.cartService.createCart(createCartDto);
  }

  @Get(':customerId')
  async findAllCarts(@Param('customerId') customerId: number): Promise<Cart[]> {
    return this.cartService.findAllCarts(customerId);
  }
}
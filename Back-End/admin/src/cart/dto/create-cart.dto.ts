// File: MultipleFiles/create-cart.dto.ts
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  customerId: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
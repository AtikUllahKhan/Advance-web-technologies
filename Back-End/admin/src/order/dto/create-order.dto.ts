// File: MultipleFiles/create-order.dto.ts
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  customerId: number;

  @IsNotEmpty()
  @IsNumber()
  vendorId: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number; // Add quantity here

  @IsOptional()
  @IsString()
  status: string; // e.g., 'Pending', 'Completed', etc.

  @IsNotEmpty()
  @IsNumber()
  total: number; // Total amount for the order
}
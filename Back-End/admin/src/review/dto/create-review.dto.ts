// File: MultipleFiles/create-review.dto.ts
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @IsNotEmpty()
  comment: string;

  @IsNotEmpty()
  orderId: number; // Reference to the order being reviewed
}
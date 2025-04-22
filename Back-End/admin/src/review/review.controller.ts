// File: MultipleFiles/review.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async createReview(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
    return this.reviewService.createReview(createReviewDto);
  }

  @Get('order/:orderId')
  async findReviewsByOrder(@Param('orderId') orderId: number): Promise<Review[]> {
    return this.reviewService.findReviewsByOrder(orderId);
  }
}
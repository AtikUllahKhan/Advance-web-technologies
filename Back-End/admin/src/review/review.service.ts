// File: MultipleFiles/review.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async createReview(createReviewDto: CreateReviewDto): Promise<Review> {
    const review = this.reviewRepository.create(createReviewDto);
    return await this.reviewRepository.save(review);
  }

  async findReviewsByOrder(orderId: number): Promise<Review[]> {
    return await this.reviewRepository.find({ where: { order: { id: orderId } } });
  }
}
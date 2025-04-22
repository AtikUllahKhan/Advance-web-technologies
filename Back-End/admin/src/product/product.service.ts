import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { Product } from './entity/Product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
//import { Review } from 'src/review/entity/review.entity';
import { Cron } from '@nestjs/schedule';
import { Vendor } from 'src/vendor/entities/vendor.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository:Repository<Product>,
       // @InjectRepository(Review)
       // private readonly reviewRepository: Repository<Review>,
        @InjectRepository(Vendor)
        private readonly vendorRepository: Repository<Vendor>,

    ){}
    
    async createProduct(createProductDto: CreateProductDto): Promise<Product>{
        const { vendorId, ...productData } = createProductDto;

        const vendor = await this.vendorRepository.findOne({ where: { id: vendorId} });
        if(!vendor) {
            throw new NotFoundException(`Vendor ID ${vendorId} not found`);
        }



        const product = this.productRepository.create({ ...productData, vendorId });
        return await this.productRepository.save(product);
    }
    
    async findAll(filters: {
        name?: string;
        category?: string;
        priceMin?: number;
        priceMax?: number;
        ratingMin?: number;
        ratingMax?: number;
        hasDiscount?: boolean;
    }): Promise<Product[]>{
        const queryBuilder = this.productRepository.createQueryBuilder('product');

        if(filters?.name) {
            queryBuilder.andWhere('product.productname LIKE :name', { name: `%${filters.name}%` });
        }

        if(filters?.category) {
            queryBuilder.andWhere('product.category = :category', { category: filters.category });
        }

        if(filters?.priceMin) {
            queryBuilder.andWhere('product.price >= :priceMin', { priceMin: filters.priceMin });
        }

        if(filters?.priceMax) {
            queryBuilder.andWhere('product.price <= :priceMax', { priceMax: filters.priceMax });
        }

        if(filters?.ratingMin) {
            queryBuilder.andWhere('product.averageRating >= :ratingMin', { ratingMin: filters.ratingMin });
        }

        if(filters?.ratingMax) {
            queryBuilder.andWhere('product.averageRating <= :ratingMax', { ratingMax: filters.ratingMax });
        }

        if(filters?.hasDiscount) {
            const now = new Date();
            queryBuilder.andWhere('product.discount IS NOT NULL')
            .andWhere('product.discountStart <= :now', { now })
            .andWhere('product.discountEnd >= :now', { now });
        }

        return await queryBuilder.getMany();
    }
    
    async findOne(id:number): Promise<Product>{
        return await this.productRepository.findOne({where: {id}});
    }
    
    async updateProduct(id:number, updateProductDto:UpdateProductDto): Promise<Product>{
        if(!updateProductDto || Object.keys(updateProductDto).length===0) {
            throw new BadRequestException('No products are given for update');
        }
    
        const existingProduct = await this.productRepository.findOne({where: { id }});
        if(!existingProduct) {
            throw new NotFoundException(`Product ID ${id} not found`);
        }
    
        await this.productRepository.update(id, updateProductDto);
        return this.productRepository.findOne({where: {id} });
    }

    async updateStock(productId: number, stockChange: number) : Promise<Product> {
        const product = await this.findOne(productId);

        if(product.stock + stockChange < 0) {
            throw new BadRequestException(`Insufficient stock for product Id ${productId}`);
        }

        product.stock += stockChange;
        return this.productRepository.save(product);
    }

    async updateAverageRating(productId: number): Promise<Product> {
        const product = await this.findOne(productId);
        const reviews = await this.productRepository.createQueryBuilder('product').relation('reviews').of(product).loadMany();
        if(reviews.length > 0) {
            const totalRating = reviews.reduce((sum, review)=> sum + review.rating, 0);
            product.averageRating = parseFloat((totalRating / reviews.length).toFixed(1));
        } else {
            product.averageRating = 0;
        }
        return this.productRepository.save(product);
    }

    /*async getProductReviews(productId: number): Promise<Review[]> {
        const product = await this.findOne(productId);
        if(!product) {
            throw new NotFoundException(`Product ID ${productId} not found`);
        }
        return product.reviews;
    }

    async getReviewSorted(productId: number): Promise<Review[]> {
        const product = await this.findOne(productId);
        if(!product) {
            throw new NotFoundException(`Product ID ${productId} not found`);
        }
        return this.reviewRepository.find({ where: { product }, order: { rating: 'DESC'} });
    }*/

    async applyDiscount(productId: number, discount: number, discountStart: Date, discountEnd: Date): Promise<Product> {
        const product = await this.findOne(productId);

        if(!product) {
            throw new NotFoundException(`Product ID ${productId} not found`);
        }

         if (discount <= 0 || discount > 100) {
            throw new BadRequestException('Discount must be between 0 and 100');
         }
         
         if (!discountStart || !discountEnd) {
            throw new BadRequestException('Both discountStart and discountEnd must be provided');
        }
    
        if (discountStart >= discountEnd) {
            throw new BadRequestException('discountStart must be earlier than discountEnd');
        }

         product.discount = discount;
         product.discountStart = discountStart;
         product.discountEnd = discountEnd;

         return await this.productRepository.save(product)
    }

    async getFinalPrice(productId:number): Promise<number> {
        const product = await this.findOne(productId);

        if(!product) {
            throw new NotFoundException(`Product ID ${productId} not found`);
        }

        const now = new Date();
        if(
            product.discount && product.discountStart && product.discountEnd && now >=product.discountStart && now <= product.discountEnd
        ) {
            return parseFloat((product.price * (1 - product.discount / 100)).toFixed(2));
        }

        return product.price;
    }

    @Cron('0 0 * * *')
    async resetExpiredDiscount(): Promise<void> {
        const now = new Date();

        await this.productRepository.update(
            { discountEnd: LessThanOrEqual(now) },
            { discount: null, discountStart: null, discountEnd: null},
        );

    }

    async deleteProduct(id: number):Promise<void>{
        const deleteResult = await this.productRepository.delete(id);
    }

}

import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entity/Product.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('product')
export class ProductController {
          constructor(private readonly productService: ProductService) {}

    
        @Post('create')
        async createProduct(@Body()createProductDto: CreateProductDto): Promise<{message: string; Product}> {
        const createProduct = await this.productService.createProduct(createProductDto);
        return {message: 'Product added successfully', Product:createProduct};
        }
        
        @UseGuards(AuthGuard)    
        @Get('all')
        async findAll(
        @Query('name') name?: string,
        @Query('category') category?: string,
        @Query('priceMin') priceMin?: string,
        @Query('priceMax') priceMax?: string,
        @Query('ratingMin') ratingMin?: string,
        @Query('ratingMax') ratingMax?: string,
        @Query('hasDiscount') hasDiscount?: string,
        ):Promise<Product[]>{
            const filters = {
                name, category,
                priceMin: priceMin ? parseFloat(priceMin): undefined,
                priceMax: priceMax ? parseFloat(priceMax): undefined,
                ratingMin: ratingMin ? parseFloat(ratingMin): undefined,
                ratingMax: ratingMax ? parseFloat(ratingMax): undefined,
                hasDiscount: hasDiscount === 'true',
            };
            return await this.productService.findAll(filters);
        }
        
        @Get(':id')
        async findOne(@Param('id') id:number): Promise<Product>{
            return this.productService.findOne(+id);
        }
        
        @Put(':id')
            async updateProduct(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto,): Promise<{message:string; Product}> {
        
            if (isNaN(id)) {
                throw new BadRequestException('Invalid ID');
            }
        
            const updateProduct = await this.productService.updateProduct(+id, updateProductDto);
        
            return {message: `product ID ${id} updated successfully`, Product:updateProduct};
        }

        @Put(':id/stock')
         async updateStock(@Param('id')productId: number, @Body() body: { stockChange: number}): Promise<{message: string; product: Product}> {
            const product = await this.productService.updateStock(productId, body.stockChange);
            return { message: `Stock for product ID ${productId} updated`, product};
        }

        @Put(':id/average-rating')
         async updateAverageRating(@Param('id', ParseIntPipe) id: number) {
            return await this.productService.updateAverageRating(id);
        }

              /*@Get(':id/reviews')
              async getProductReviews(@Param('id') productId: number) {
                return this.productService.getProductReviews(productId);
              }*/

        @Post(':id/discount')
         async applyDiscount(@Param('id') id: number, @Body() disciountData: { discount: number; discountStart: Date; discountEnd: Date}) {
           const { discount, discountStart, discountEnd } = disciountData;
            return await this.productService.applyDiscount(id, discount, discountStart, discountEnd);
        }

        @Get(':id/price')
        async getFinalPrice(@Param('id') id: number) {
            return { finalPrice: await this.productService.getFinalPrice(id)};
        }

       
        @Delete(':id')
        async deleteProduct(@Param('id') id: number): Promise<{message:string}> {
            await this.productService.deleteProduct(+id);
            return { message:  `Product ID ${id} deleted`};
        }

}

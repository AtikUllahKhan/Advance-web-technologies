import { IsBoolean, IsEnum, IsNotEmpty, IsOptional } from "class-validator";

export class GetProductSortedByRatingDto {
    @IsNotEmpty()
    @IsEnum(['ASC', 'DESC'], {message: 'Order must be ASC or DESC'})
    order: 'ASC' | 'DESC';

    @IsNotEmpty()
    @IsOptional()
    productId: number;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    category: string;

    @IsNotEmpty()
    priceMin: string;

    @IsNotEmpty()
    priceMax: string;

    @IsNotEmpty()
    ratingMin: string;

    @IsNotEmpty()
    ratingMax: string;

    @IsNotEmpty()
    @IsBoolean()
    hasDiscount: string;
}
import { IsDate, IsNotEmpty, IsNumber, IsOptional, Length, Max, Min } from "class-validator";

export class CreateProductDto {

    @IsNotEmpty()
    @IsNumber()
    vendorId: number;
    
    @IsNotEmpty({message: 'Product Name is required'})
    @Length(1, 100)
    productname: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    @Length(1, 200, {message: "Catagory must be seleted"})
    category: string;

    @IsNotEmpty()
    stock: number;

    //@IsNotEmpty()
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(100)
    discount: number;

    //@IsNotEmpty()
    @IsOptional()
    @IsDate()
    discountStart: Date;

    //@IsNotEmpty()
    @IsOptional()
    @IsDate()
    discountEnd: Date;
}

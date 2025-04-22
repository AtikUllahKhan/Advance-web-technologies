import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateAdminDto {
    @IsNotEmpty()
    name?: string;
    
    @IsNotEmpty()
    @IsEmail({}, { message: 'Email must be a valid email address' })
    email?: string;

    
  }
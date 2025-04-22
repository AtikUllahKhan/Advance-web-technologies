import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @Length(1, 100)
  email: string;

  @IsNotEmpty()
  password: string;
}
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class UpdateVendorDto {
  @IsNotEmpty({ message: 'Vendor Name is required' })
  @Length(1, 100)
  vendorname: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @Length(11,15,  { message: 'Phone number must be  11 characters' })
  phonenumber: string;

  @IsNotEmpty({ message: 'Location is required' })
  location: string;
}
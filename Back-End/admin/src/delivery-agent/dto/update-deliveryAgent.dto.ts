import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class UpdateDeliveryAgentDto {
  @IsNotEmpty({ message: 'Delivery Agent Name is required' })
  @Length(1, 100)
  deliveryAgentname: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;
  
  @IsNotEmpty({ message: 'Phone number is required' })
  @Length(11,15,  { message: 'Phone number must be  11 characters' })
  phonenumber: string;

  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  @IsNotEmpty({ message: 'Vehicle Type is required' })
  vehicleType: string;

}
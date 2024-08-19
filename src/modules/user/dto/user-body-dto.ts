import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserBodyDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsNumber()
  companyId: number;
  @IsNotEmpty()
  @IsString()
  companyName: string;
}
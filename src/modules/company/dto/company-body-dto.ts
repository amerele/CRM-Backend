import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CompanyBodyDTO {
  @IsNotEmpty()
  @IsString()
  companyName: string;
  @IsNotEmpty()
  @IsString()
  location: string;
  @IsNotEmpty()
  @IsNumber()
  companyId: number;
}
import { IsOptional, IsEmail, IsPhoneNumber } from 'class-validator';

export class UpdateCompany {
  @IsOptional()
  name: string;

  @IsOptional()
  city: string;

  @IsOptional()
  state: string;

  @IsOptional()
  cep: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsPhoneNumber('ZZ')
  contact1: string;

  @IsOptional()
  @IsPhoneNumber('ZZ')
  contact2: string;
}

import {
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsPhoneNumber,
} from 'class-validator';

export class NewCompanyDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  cep: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber('ZZ')
  contact1: string;

  @IsOptional()
  @IsPhoneNumber('ZZ')
  contact2: string;
}

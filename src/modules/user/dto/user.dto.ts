import { Role } from '../entity/user.entity';
import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsString,
  IsOptional,
} from 'class-validator';

export class NewUserDto {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(30)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(30)
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(30)
  confirm_password: string;

  @IsOptional()
  role: Role;

  userId: string;
}

import { IsNotEmpty } from 'class-validator';

export class Token {
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  refreshToken: string;
}

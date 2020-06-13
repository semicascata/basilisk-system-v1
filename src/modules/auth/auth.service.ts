import { Injectable, Logger } from '@nestjs/common';
import { UsersRepository } from '../user/user.repository';
import { Connection } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/entity/user.entity';
import { Token } from './dto/token.dto';
import { JwtPayload } from './dto/jwt-payload.dto';
import {
  JWT_EXPIRESIN,
  JWT_REFRESH,
  JWT_REFRESH_EXPIRESIN,
} from '../../config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  // private logger = new Logger('AuthService');
  private tokenList = {};
  private usersRepository: UsersRepository;

  constructor(private connection: Connection, private jwtService: JwtService) {
    this.usersRepository = this.connection.getCustomRepository(UsersRepository);
  }

  // validation
  async validateUser(loginDto: LoginDto): Promise<any> {
    const user = await this.usersRepository.findUserByUsername(
      loginDto.username,
    );

    const isMatch = await this.usersRepository.comparePassword(
      loginDto.password,
      user.password,
    );

    if (user && isMatch) {
      const tokens = await this.createTokens(user);

      const data = {
        user: user.username,
      };

      // token list
      this.tokenList[tokens.refreshToken] = data;

      return tokens;
    }
    return null;
  }

  // generate tokens
  async createTokens(user: User): Promise<Token> {
    const payload: JwtPayload = { id: user.id, username: user.username };

    const token = this.jwtService.sign(payload, {
      expiresIn: JWT_EXPIRESIN,
    });

    const refreshToken = jwt.sign(payload, JWT_REFRESH, {
      expiresIn: JWT_REFRESH_EXPIRESIN,
    });

    return {
      token,
      refreshToken,
    };
  }
}

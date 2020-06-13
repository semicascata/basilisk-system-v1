import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { User } from 'src/modules/user/entity/user.entity';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private logger = new Logger('LocalStrategy');

  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  // validation
  async validate(username: string, password: string): Promise<User> {
    const loginDto: LoginDto = { username, password };

    try {
      const user = await this.authService.validateUser(loginDto);

      if (!user) {
        throw new UnauthorizedException();
      }
      this.logger.verbose('User logged in');

      return user;
    } catch (err) {
      this.logger.error('Invalid credentials');
      throw new UnauthorizedException();
    }
  }
}

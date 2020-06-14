import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { JWT_SECRET } from 'src/config';
import { JwtPayload } from '../dto/jwt-payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private logger = new Logger('JwtStrategy');
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  // validation
  async validate(payload: JwtPayload, done: Function) {
    const user = await this.authService.validateToken(payload);

    if (!user) {
      this.logger.error('Invalid credentials');
      return done(new UnauthorizedException('Invalid credentials'), false);
    }
    done(null, user);
  }
}

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../modules/user/entity/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  private logger = new Logger('RolesGuard');
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('role', context.getHandler());

    if (!roles || roles.length === 0) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const user = req.user;

    // return this.matchRole(roles, user.role);

    const matchUserRole = this.matchRole(roles, user.role);

    if (matchUserRole) {
      this.logger.verbose('User role authorized');
      return matchUserRole;
    } else {
      this.logger.error('User role not authorized');
      throw new ForbiddenException('User role not authorized');
    }
  }

  // check the user role
  private matchRole(roles: string[], userRole: Role) {
    return roles.includes(userRole);
  }
}

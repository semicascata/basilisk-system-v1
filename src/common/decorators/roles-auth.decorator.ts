import { Role } from '../../modules/user/entity/user.entity';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../guards/roles.guard';

export function AuthRole(...roles: Role[]) {
  return applyDecorators(SetMetadata('role', roles), UseGuards(RolesGuard));
}

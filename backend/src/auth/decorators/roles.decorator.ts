import { SetMetadata } from '@nestjs/common';
import { AuthRole } from 'src/types/role';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: AuthRole[]) => SetMetadata(ROLES_KEY, roles);

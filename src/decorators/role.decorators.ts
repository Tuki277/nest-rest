import { SetMetadata } from '@nestjs/common';
import { EAppRoles } from 'src/common/enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: EAppRoles[]) => SetMetadata(ROLES_KEY, roles);

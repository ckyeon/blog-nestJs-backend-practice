import { SetMetadata } from '@nestjs/common';
import { TUserRole } from '../auth/enum/user-roles.enum';

export const Roles = (...roles: TUserRole[]) => SetMetadata('role', roles);

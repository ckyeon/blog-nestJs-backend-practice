import { TUserRole } from '../auth/enum/user-roles.enum';
import { BaseModel } from './base';

export interface User extends BaseModel {
  email: string;
  name: string;
  phone: string;
  role: TUserRole;
  auth: string | null;
}

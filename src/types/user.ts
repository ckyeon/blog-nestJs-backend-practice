import { TUserRole } from '../auth/enum/user-roles.enum';

export interface IUser {
  _id?: string;
  email: string;
  name: string;
  phone: string;
  role: TUserRole;
  auth: string | null;
}

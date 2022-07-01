import { TAuthProvider } from '../auth/enum/auth-providers.enum';

export interface IAuth {
  _id?: string;
  provider: TAuthProvider;
  providerId: string;
  password: string;
  user: string;
}

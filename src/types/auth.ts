import { TAuthProvider } from '../auth/enum/auth-providers.enum';
import { BaseModel } from './base';

export interface Auth extends BaseModel {
  provider: TAuthProvider;
  providerId: string;
  password: string;
}

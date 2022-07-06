import { BaseModel } from './base';

export interface RefreshToken extends BaseModel {
  value: string;
}
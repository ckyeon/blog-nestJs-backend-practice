import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import {
  AUTH_PROVIDERS,
  TAuthProvider
} from '../enum/auth-providers.enum';
import { Auth } from '../../types/auth';

type RequiredFieldType = Pick<Auth, 'provider' | 'providerId' | 'password'>;
type OptionalFieldType = Pick<Auth, 'creator'>;
export type AuthFieldType = RequiredFieldType & OptionalFieldType;

@Schema({ collection: 'auth', timestamps: true })
export class AuthModel implements AuthFieldType {
  @Prop({ type: String, enum: AUTH_PROVIDERS, default: 'local' })
  provider: TAuthProvider;

  // provider가 local일 경우 User의 _id가 들어감
  @Prop({ type: String, required: true })
  providerId: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  creator: string;
}

export type AuthDocument = AuthModel & mongoose.Document;
export const AuthSchema = SchemaFactory.createForClass(AuthModel);

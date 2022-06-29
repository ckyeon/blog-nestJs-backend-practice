import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { AUTH_PROVIDERS, TAuthProvider } from './enum/auth-providers.enum';

@Schema()
export class Auth {
  @Prop({ type: String, enum: AUTH_PROVIDERS, default: 'local' })
  provider: TAuthProvider;

  // provider가 local일 경우 User의 _id가 들어감
  @Prop({ type: String, required: true })
  providerId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  user: string;

  @Prop({ type: String, required: true })
  password: string;
}

export type AuthDocument = Auth & mongoose.Document;
export const AuthSchema = SchemaFactory.createForClass(Auth);

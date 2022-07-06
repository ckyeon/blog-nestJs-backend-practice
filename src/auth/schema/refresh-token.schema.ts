import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { RefreshToken } from '../../types/refresh-token';

type RequiredFieldType = Pick<RefreshToken, 'value' | 'creator'>;
type OptionalFieldType = Partial<Pick<RefreshToken, 'createdAt'>>;
export type RefreshTokenFieldType = RequiredFieldType & OptionalFieldType;

@Schema({ collection: 'refresh-token' })
export class RefreshTokenModel implements RefreshTokenFieldType {
  @Prop({ type: String, unique: true, required: true })
  value: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  creator: string;

  @Prop({ type: Date, expires: '30d', default: Date.now })
  createdAt?: Date;
}

export type RefreshTokenDocument = RefreshTokenModel & mongoose.Document;
export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshTokenModel);

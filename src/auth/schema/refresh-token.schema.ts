import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class RefreshToken {
  @Prop({ type: String, unique: true, required: true })
  value: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  user: string;

  @Prop({ type: Date, expires: '30d', default: Date.now })
  createdAt: Date;
  // @Prop({ type: String, enum: USER_DEVICES, default: 'pc', required: true })
  // device: TUserDevice;
}

export type RefreshTokenDocument = RefreshToken & mongoose.Document;
export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);

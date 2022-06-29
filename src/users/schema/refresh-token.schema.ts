import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export class RefreshToken {
  @Prop({ type: String, unique: true, required: true })
  value: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  user: string;
}

export type RefreshTokenDocument = RefreshToken & mongoose.Document;
export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);

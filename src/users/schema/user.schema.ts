import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TUserRole, USER_ROLES } from './enum/user-roles.enum';
import mongoose from 'mongoose';

@Schema({
  timestamps: { createdAt: 'joinedAt', updatedAt: true },
})
export class User {
  @Prop({ type: String, unique: true, required: true })
  email: string;

  @Prop({ type: String, trim: true, index: true, required: true })
  name: string;

  @Prop({ type: String, unique: true, required: true })
  phone: string;

  @Prop({ type: String, enum: USER_ROLES, default: 'member' })
  role: TUserRole;

  @Prop({ type: mongoose.Schema.Types.ObjectId, default: null })
  auth: string;
}

export type UserDocument = User & mongoose.Document;
export const UserSchema = SchemaFactory.createForClass(User);

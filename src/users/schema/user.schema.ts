import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TUserRole, USER_ROLES } from '../../auth/enum/user-roles.enum';
import mongoose from 'mongoose';
import { User } from '../../types/user';

type RequiredFieldType = Pick<User, 'email' | 'name' | 'phone'>;
type OptionalFieldType = Partial<Pick<User, 'role' | 'auth'>>;
export type UserFieldType = RequiredFieldType & OptionalFieldType;

@Schema({
  collection: 'user',
  timestamps: { createdAt: 'joinedAt', updatedAt: true },
})
export class UserModel implements UserFieldType {
  @Prop({ type: String, unique: true, required: true })
  email: string;

  @Prop({ type: String, trim: true, index: true, required: true })
  name: string;

  @Prop({ type: String, unique: true, required: true })
  phone: string;

  @Prop({ type: String, enum: USER_ROLES, default: 'member' })
  role?: TUserRole;

  @Prop({ type: mongoose.Schema.Types.ObjectId, default: null })
  auth?: string | null;
}

export type UserDocument = UserModel & mongoose.Document;
export const UserSchema = SchemaFactory.createForClass(UserModel);

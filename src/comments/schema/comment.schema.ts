import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../types/user';

type RequiredFieldType = Pick<CommentModel, 'content' | 'post' | 'creator'>;
type OptionalFieldType = Partial<Pick<CommentModel, 'attachments'>>;
export type CommentFieldType = RequiredFieldType & OptionalFieldType;

@Schema({ collection: 'comment', timestamps: true })
export class CommentModel implements CommentFieldType {
  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' })
  creator: string | User;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], default: null, ref: 'File' })
  attachments?: string[] | null;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  post: string;
}

export type CommentDocument = CommentModel & mongoose.Document;
export const CommentSchema = SchemaFactory.createForClass(CommentModel);

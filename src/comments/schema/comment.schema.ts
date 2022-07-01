import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { IComment } from '../../types/comment';

@Schema()
export class Comment implements IComment {
  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  post: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' })
  user: string;
}

export type CommentDocument = Comment & mongoose.Document;
export const CommentSchema = SchemaFactory.createForClass(Comment);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Transform } from 'class-transformer';
import { Post } from '../../types/post';

type RequiredFieldType = Pick<Post, 'title' | 'categories' | 'tags' | 'body' | 'creator' >;
type OptionalFieldType = Partial<Pick<Post, 'comments' | 'attachments' | 'updatedAt'>>;
export type PostFieldType = RequiredFieldType & OptionalFieldType;

@Schema({
  collection: 'post',
  timestamps: { createdAt: true, updatedAt: false }
})
export class PostModel implements PostFieldType {
  @Prop({ type: String, index: true, required: true, trim: true })
  title: string;

  @Prop({ type: [String], required: true })
  @Transform(({ value }) => value.split(','))
  categories: string[];

  @Prop({ type: [String], required: true })
  @Transform(({ value }) => value.split(','))
  tags: string[];

  @Prop({ type: String, required: true })
  body: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], default: null, ref: 'CommentModel' })
  comments?: string[] | null;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], default: null, ref: 'FileModel' })
  attachments?: string[] | null;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'UserModel' })
  creator: string;

  @Prop({ type: Date, default: Date.now })
  updatedAt?: Date;
}

export type PostDocument = PostModel & mongoose.Document;
export const PostSchema = SchemaFactory.createForClass(PostModel);

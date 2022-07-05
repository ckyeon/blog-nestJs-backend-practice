import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Transform } from 'class-transformer';
import { IPost } from '../../types/post';

@Schema({ timestamps: true })
export class BPost implements IPost {
  @Prop({ type: [String], required: true })
  @Transform(({ value }) => value.split(','))
  categories: string[];

  @Prop({ type: [String], required: true })
  @Transform(({ value }) => value.split(','))
  tags: string[];

  @Prop({ type: String, index: true, required: true, trim: true })
  title: string;
  @Prop({ type: String, required: true })
  body: string;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    default: null,
    ref: 'Comment'
  })
  comments: string[] | null;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], default: null, ref: 'File' })
  attachments?: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' })
  user: string;
}

export type PostDocument = BPost & mongoose.Document;
export const PostSchema = SchemaFactory.createForClass(BPost);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Transform } from 'class-transformer';

@Schema({ timestamps: true })
export class BPost {
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

  @Prop({ type: [mongoose.Schema.Types.ObjectId], default: null })
  comments: string[];
}

export type PostDocument = BPost & mongoose.Document;
export const PostSchema = SchemaFactory.createForClass(BPost);

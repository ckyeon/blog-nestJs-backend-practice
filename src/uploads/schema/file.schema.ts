import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { FILE_REF_TYPE, FileRefType, IFile } from '../../types/file';
import mongoose from 'mongoose';

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class File implements IFile {
  @Prop({ type: String })
  filename: string;

  @Prop({ type: String, unique: true, required: true })
  key: string;

  @Prop({ type: String, required: true })
  mimetype: string;

  @Prop({ type: Number })
  size: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, default: null })
  creator: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, default: null, index: true })
  ref: string | null;

  @Prop({
    type: String,
    enum: [...FILE_REF_TYPE, null],
    default: null,
    index: true
  })
  refType: FileRefType | null;
}

export type FileDocument = File & mongoose.Document;
export const FileSchema = SchemaFactory.createForClass(File);
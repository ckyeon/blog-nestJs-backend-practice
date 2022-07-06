import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { File, FILE_REF_TYPE, FileRefType } from '../../types/file';
import mongoose from 'mongoose';
import { User } from '../../types/user';

type RequiredFieldType = Pick<File, 'filename' | 'key' | 'mimetype' | 'size' | 'creator'>;
type OptionalFieldType = Partial<Pick<File, 'ref' | 'refType'>>;
export type FileFieldType = RequiredFieldType & OptionalFieldType;

@Schema({
  collection: 'file',
  timestamps: { createdAt: true, updatedAt: false }
})
export class FileModel implements FileFieldType {
  @Prop({ type: String, required: true })
  filename: string;

  @Prop({ type: String, unique: true, required: true })
  key: string;

  @Prop({ type: String, required: true })
  mimetype: string;

  @Prop({ type: Number, required: true })
  size: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  creator: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, default: null, index: true })
  ref?: string;

  @Prop({ type: String, enum: [...FILE_REF_TYPE, null], default: null, index: true })
  refType?: FileRefType;
}

export type FileDocument = FileModel & mongoose.Document;
export const FileSchema = SchemaFactory.createForClass(FileModel);
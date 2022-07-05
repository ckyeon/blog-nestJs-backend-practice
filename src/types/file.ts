
export const FILE_REF_TYPE = [
  'Post',
  'Comment'
] as const;
export type FileRefType = typeof FILE_REF_TYPE[number];

export interface IFile {
  _id?: string;
  key: string;
  mimetype: string;
  filename: string;
  size: number;
  ref: string | null;
  refType: FileRefType;
  creator: string;
  createdAt?: Date;
}
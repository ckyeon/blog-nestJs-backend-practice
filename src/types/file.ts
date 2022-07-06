import { User } from './user';

export const FILE_REF_TYPE = [
  'Post',
  'Comment'
] as const;
export type FileRefType = typeof FILE_REF_TYPE[number];

import { CreateBase } from './base';

export interface File extends CreateBase {
  key: string;
  mimetype: string;
  filename: string;
  size: number;
  ref: string | null;
  refType: FileRefType | null;
}

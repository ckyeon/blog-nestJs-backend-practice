import { BaseModel } from './base';

export interface Comment extends BaseModel {
  content: string;
  post: string;
  attachments: string[] | null;
}

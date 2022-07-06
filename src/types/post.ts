import { BaseModel } from './base';

export interface Post extends BaseModel {
  title: string;
  categories: string[];
  tags: string[];
  body: string;
  comments: string[] | null;
  attachments: string[] | null;
}

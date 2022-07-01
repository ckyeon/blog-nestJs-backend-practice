export interface IPost {
  _id?: string;
  title: string;
  categories: string[];
  tags: string[];
  body: string;
  comments: string[] | null;
}

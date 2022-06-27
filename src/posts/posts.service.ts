import { Injectable } from '@nestjs/common';
import { NotFoundPostException } from './exceptions/NotFoundPostException';
import { ulid } from 'ulid';

export interface IPost {
  id?: string;
  category: string[];
  tag: string[];
  title: string;
  body: string;
  // comment?: {};
}

@Injectable()
export class PostsService {
  posts: IPost[] = [];

  private findIdx(id: string): number {
    const idx = this.posts.findIndex((post: IPost) => post.id === id);
    if (idx === -1) {
      throw NotFoundPostException(id);
    }
    return idx;
  }

  findAll(): IPost[] {
    return this.posts;
  }

  findById(id: string): IPost {
    const idx = this.findIdx(id);
    return this.posts[idx];
  }

  create(post: IPost): string {
    post.id = ulid();
    this.posts.push(post);
    return post.id;
  }

  update(id: string, post: IPost): string {
    const idx = this.findIdx(id);

    delete post.id;
    this.posts[idx] = { ...this.posts[idx], ...post };
    return this.posts[idx].id;
  }

  deleteOne(id: string): string {
    const idx = this.findIdx(id);
    const exPost = this.posts[idx];
    this.posts.splice(idx, 1);
    return exPost.id;
  }
}

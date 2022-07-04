import { Injectable } from '@nestjs/common';
import { NotFoundPostException } from '../exceptions/NotFoundPostException';
import { InjectModel } from '@nestjs/mongoose';
import { BPost, PostDocument } from './schema/post.schema';
import { Model } from 'mongoose';
import { QueryPostDto } from './dto/query-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(BPost.name) private postModel: Model<PostDocument>) {}

  async findAll(query: QueryPostDto): Promise<PostDocument[]> {
    const { limit, orderByCreatedAt } = query;
    delete query.limit;
    delete query.orderByCreatedAt;
    return this.postModel
      .find(query)
      .populate({ path: 'user', select: 'name' })
      .populate({
        path: 'comments',
        select: 'user content',
        populate: { path: 'user', select: 'name' }
      })
      .limit(limit)
      .sort(orderByCreatedAt)
      .exec();
  }

  async findById(id: string): Promise<PostDocument> {
    const post = await this.postModel.findById(id);
    if (!post) {
      throw new NotFoundPostException(id);
    }
    return post;
  }

  async create(dto: CreatePostDto): Promise<PostDocument> {
    return this.postModel.create(dto);
  }

  async update(id: string, dto: UpdatePostDto): Promise<PostDocument> {
    const post: PostDocument = await this.findById(id);
    await post.updateOne({ $set: dto }).exec();
    return this.findById(id);
  }

  async deleteById(id: string): Promise<PostDocument> {
    const post: PostDocument = await this.findById(id);
    await post.deleteOne();
    return post;
  }

  async deleteAll(): Promise<PostDocument[]> {
    const posts: PostDocument[] = await this.findAll({});
    await this.postModel.deleteMany({});
    return posts;
  }
}

import { Injectable } from '@nestjs/common';
import { NotFoundPostException } from '../exceptions/NotFoundPostException';
import { InjectModel } from '@nestjs/mongoose';
import { BPost, PostDocument } from './schema/post.schema';
import { Model } from 'mongoose';
import { QueryPostDto } from './dto/query-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UploadsService } from '../uploads/uploads.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(BPost.name) private postModel: Model<PostDocument>,
    private readonly uploadsService: UploadsService
  ) {}

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
      .populate({
        path: 'attachments',
        select: 'key'
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
    const postDocument: PostDocument = await this.postModel.create(dto);
    await this.uploadsService.insertRef(dto.attachments || [], postDocument._id, 'Post');
    return this.postModel.create(dto);
  }

  async update(postId: string, dto: UpdatePostDto): Promise<PostDocument> {
    const post: PostDocument = await this.findById(postId);
    if (!post) {
      throw new NotFoundPostException(postId);
    }

    await this.uploadsService.updateRef(dto.attachments, postId, 'Post');
    await post.updateOne({ $set: dto }).exec();
    return this.findById(postId);
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

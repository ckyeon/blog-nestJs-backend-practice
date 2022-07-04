import { Injectable, Query } from '@nestjs/common';
import {
  NotFoundCommentException
} from '../exceptions/NotFoundCommentException';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from './schema/comment.schema';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { QueryCommentDto } from './dto/query-comment.dto';
import { BPost, PostDocument } from '../posts/schema/post.schema';
import {
  NotFoundPostException
} from '../exceptions/NotFoundPostException';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<CommentDocument>,
    @InjectModel(BPost.name) private readonly postModel: Model<PostDocument>
  ) {
  }

  findAll(query: QueryCommentDto): Promise<CommentDocument[]> {
    const { limit, orderByCreatedAt } = query;
    delete query.limit;
    delete query.orderByCreatedAt;
    return this.commentModel.find(query).limit(limit).sort(orderByCreatedAt).exec();
  }

  async findOne(commentId: string): Promise<CommentDocument> {
    const comment: CommentDocument = await this.commentModel.findById(commentId);
    if (!comment) {
      throw new NotFoundCommentException(commentId);
    }
    return comment;
  }

  async create(userId: string, dto: CreateCommentDto): Promise<CommentDocument> {
    const { post, content } = dto;
    const exPost: PostDocument = await this.postModel.findById(post);
    if (!exPost) {
      throw new NotFoundPostException(post);
    }
    const comment = await this.commentModel.create({
      user: userId,
      post: post,
      content: content
    });
    await exPost.updateOne({ $push: { comments: comment._id } }).exec();
    return comment;
  }

  async update(commentId: string, dto: UpdateCommentDto): Promise<CommentDocument> {
    const comment: CommentDocument = await this.commentModel.findById(commentId);
    if (!comment) {
      throw new NotFoundCommentException(commentId);
    }
    await comment.updateOne({ $set: dto }).exec();
    return this.commentModel.findById(commentId);
  }

  async deleteOne(commentId: string): Promise<CommentDocument> {
    const comment = await this.commentModel.findById(commentId);
    if (!comment) {
      throw new NotFoundCommentException(commentId);
    }
    await comment.deleteOne();
    return comment;
  }
}

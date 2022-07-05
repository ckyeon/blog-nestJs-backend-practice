import { Injectable, Query } from '@nestjs/common';
import { NotFoundCommentException } from '../exceptions/NotFoundCommentException';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from './schema/comment.schema';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { QueryCommentDto } from './dto/query-comment.dto';
import { BPost, PostDocument } from '../posts/schema/post.schema';
import { NotFoundPostException } from '../exceptions/NotFoundPostException';
import { UploadsService } from '../uploads/uploads.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<CommentDocument>,
    @InjectModel(BPost.name) private readonly postModel: Model<PostDocument>,
    private readonly uploadsService: UploadsService
  ) {}

  findAll(query: QueryCommentDto): Promise<CommentDocument[]> {
    const { limit, orderByCreatedAt } = query;
    delete query.limit;
    delete query.orderByCreatedAt;
    return this.commentModel
      .find(query)
      .populate({
        path: 'attachments',
        select: 'key'
      })
      .limit(limit)
      .sort(orderByCreatedAt)
      .exec();
  }

  async findOne(commentId: string): Promise<CommentDocument> {
    const comment: CommentDocument = await this.commentModel.findById(commentId);
    if (!comment) {
      throw new NotFoundCommentException(commentId);
    }
    return comment;
  }

  async create(dto: CreateCommentDto): Promise<CommentDocument> {
    const { post } = dto;
    const exPost: PostDocument = await this.postModel.findById(post);
    if (!exPost) {
      throw new NotFoundPostException(post);
    }

    const comment: CommentDocument = await this.commentModel.create(dto);
    await this.uploadsService.insertRef(dto.attachments || [], comment._id, 'Comment');
    await exPost.updateOne({ $push: { comments: comment._id } }).exec();

    return comment;
  }

  async update(commentId: string, dto: UpdateCommentDto): Promise<CommentDocument> {
    const comment: CommentDocument = await this.commentModel.findById(commentId);
    if (!comment) {
      throw new NotFoundCommentException(commentId);
    }
    await this.uploadsService.updateRef(dto.attachments || [], comment._id, 'Comment');
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

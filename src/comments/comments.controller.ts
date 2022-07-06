import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, Query, UseGuards
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentModel } from './schema/comment.schema';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { QueryCommentDto } from './dto/query-comment.dto';
import { User } from '../decorators/user.decorator';
import { AccessTokenPayload } from '../types/auth-tokens';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {
  }

  @Get()
  findAll(@Query() query: QueryCommentDto): Promise<CommentModel[]> {
    return this.commentsService.findAll(query);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  findMyAll(@User() user: AccessTokenPayload, @Query() query: QueryCommentDto): Promise<CommentModel[]> {
    query.creator = user._id;
    return this.commentsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') commentId: string): Promise<CommentModel> {
    return this.commentsService.findOne(commentId);
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@User() user: AccessTokenPayload, @Body() dto: CreateCommentDto): Promise<CommentModel> {
    dto.creator = user._id;
    return this.commentsService.create(dto);
  }

  @Put(':id')
  update(@Param('id') commentId: string, @Body() dto: UpdateCommentDto): Promise<CommentModel> {
    return this.commentsService.update(commentId, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<CommentModel> {
    return this.commentsService.deleteOne(id);
  }
}

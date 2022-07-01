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
import { Comment } from './schema/comment.schema';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { QueryCommentDto } from './dto/query-comment.dto';
import { User } from '../decorators/user.decorator';
import { IAccessTokenPayload } from '../types/auth-tokens';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {
  }

  @Get()
  findAll(@Query() query: QueryCommentDto): Promise<Comment[]> {
    return this.commentsService.findAll(query);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  findMyAll(@User() user: IAccessTokenPayload, @Query() query: QueryCommentDto):Promise<Comment[]> {
    query.user = user._id;
    console.log(query);
    return this.commentsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') commentId: string): Promise<Comment> {
    return this.commentsService.findOne(commentId);
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@User() user: IAccessTokenPayload, @Body() dto: CreateCommentDto): Promise<Comment> {
    return this.commentsService.create(user._id, dto);
  }

  @Put(':id')
  update(@Param('id') commentId: string, @Body() dto: UpdateCommentDto): Promise<Comment> {
    return this.commentsService.update(commentId, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Comment> {
    return this.commentsService.deleteOne(id);
  }
}

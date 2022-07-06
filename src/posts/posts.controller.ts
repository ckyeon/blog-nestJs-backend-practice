import {
  Post,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query, UseGuards
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { QueryPostDto } from './dto/query-post.dto';
import { PostModel } from './schema/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from '../decorators/user.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AccessTokenPayload } from '../types/auth-tokens';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {
  }

  @Get()
  findAll(@Query() query: QueryPostDto): Promise<PostModel[]> {
    return this.postsService.findAll(query);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  findMyAll(@User() user, @Query() query: QueryPostDto): Promise<PostModel[]> {
    query.creator = user;
    return this.postsService.findAll(query);
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<PostModel> {
    return this.postsService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@User() user: AccessTokenPayload, @Body() dto: CreatePostDto): Promise<PostModel> {
    dto.creator = user._id;
    return this.postsService.create(dto);
  }

  @Put(':postId')
  update(@Param('postId') postId: string, @Body() dto: UpdatePostDto): Promise<PostModel> {
    return this.postsService.update(postId, dto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string): Promise<PostModel> {
    return this.postsService.deleteById(id);
  }

  @Delete()
  deleteAll(): Promise<PostModel[]> {
    return this.postsService.deleteAll();
  }
}

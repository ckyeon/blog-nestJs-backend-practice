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
import { BPost } from './schema/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from '../decorators/user.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { IAccessTokenPayload } from '../types/auth-tokens';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {
  }

  @Get()
  findAll(@Query() query: QueryPostDto): Promise<BPost[]> {
    return this.postsService.findAll(query);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  findMyAll(@User() user, @Query() query: QueryPostDto): Promise<BPost[]> {
    query.user = user;
    return this.postsService.findAll(query);
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<BPost> {
    return this.postsService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@User() user: IAccessTokenPayload, @Body() dto: CreatePostDto): Promise<BPost> {
    dto.user = user._id;
    return this.postsService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePostDto): Promise<BPost> {
    return this.postsService.update(id, dto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string): Promise<BPost> {
    return this.postsService.deleteById(id);
  }

  @Delete()
  deleteAll(): Promise<BPost[]> {
    return this.postsService.deleteAll();
  }
}

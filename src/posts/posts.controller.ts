import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { IPost, PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {
  }

  @Get()
  findAll(): IPost[] {
    return this.postsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): IPost {
    return this.postsService.findById(id);
  }

  @Post()
  create(@Body() post: IPost): string {
    return this.postsService.create(post);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() post: IPost): string {
    return this.postsService.update(id, post);
  }

  @Delete(':id')
  delete(@Param('id') id: string): string {
    return this.postsService.deleteOne(id);
  }
}

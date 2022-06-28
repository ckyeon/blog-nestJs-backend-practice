import { NotFoundException } from '@nestjs/common';

export const NotFoundCommentException = (postId: string) => {
  return new NotFoundException(`Not Found Post Comments ${postId}`);
};

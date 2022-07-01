import { NotFoundException } from '@nestjs/common';

export const NotFoundPostCommentsException = (postId: string) => {
  return new NotFoundException(`Not Found Post Comments ${postId}`);
};

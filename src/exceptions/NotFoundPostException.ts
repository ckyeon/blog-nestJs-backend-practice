import { NotFoundException } from '@nestjs/common';
import { ErrorCodes } from '../errors/error-definition';

export const NotFoundPostException = (postId: string) => {
  return new NotFoundException(ErrorCodes.NOT_FOUND_POST + ` ${postId}`);
};

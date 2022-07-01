import { NotFoundException } from '@nestjs/common';
import { ErrorCodes } from '../errors/error-definition';

export const NotFoundCommentException = (commentId: string) => {
  return new NotFoundException(ErrorCodes.NOT_FOUND_COMMENT + ` ${commentId}`);
};

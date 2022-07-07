import { HttpStatus, NotFoundException } from '@nestjs/common';
import { ErrorCodes } from '../errors/error-definition';

export class NotFoundCommentException extends NotFoundException {
  constructor(commentId) {
    super(ErrorCodes.NOT_FOUND_COMMENT + `::: ${commentId}`, String(HttpStatus.NOT_FOUND));
  }
}
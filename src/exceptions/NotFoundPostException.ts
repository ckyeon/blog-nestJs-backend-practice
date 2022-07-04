import { HttpStatus, NotFoundException } from '@nestjs/common';
import { ErrorCodes } from '../errors/error-definition';

export class NotFoundPostException extends NotFoundException {
  constructor(postId: string) {
    super(ErrorCodes.NOT_FOUND_POST + `${postId}`, String(HttpStatus.NOT_FOUND));
  }
}

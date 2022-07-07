import { HttpStatus, NotFoundException } from '@nestjs/common';
import { ErrorCodes } from '../errors/error-definition';

export class NotFoundUserException extends NotFoundException {
  constructor(email: string) {
    super(ErrorCodes.NOT_FOUND_USER + `::: ${email}`, String(HttpStatus.NOT_FOUND));
  }
}

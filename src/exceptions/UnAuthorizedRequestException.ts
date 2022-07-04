import { ForbiddenException, HttpStatus } from '@nestjs/common';
import { ErrorCodes } from '../errors/error-definition';

export class UnAuthorizedRequestException extends ForbiddenException {
  constructor() {
    super(ErrorCodes.UNAUTHORIZED_REQUEST, String(HttpStatus.FORBIDDEN));
  }
}

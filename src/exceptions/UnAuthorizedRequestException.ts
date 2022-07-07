import { HttpStatus, UnauthorizedException } from '@nestjs/common';
import { ErrorCodes } from '../errors/error-definition';

export class UnAuthorizedRequestException extends UnauthorizedException {
  constructor() {
    super(ErrorCodes.UNAUTHORIZED_REQUEST, String(HttpStatus.UNAUTHORIZED));
  }
}
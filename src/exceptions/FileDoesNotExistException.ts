import { BadRequestException, HttpStatus } from '@nestjs/common';
import { ErrorCodes } from '../errors/error-definition';

export class FileDoesNotExistException extends BadRequestException {
  constructor() {
    super(ErrorCodes.FILE_DOES_NOT_EXIST, String(HttpStatus.BAD_REQUEST));
  }
}
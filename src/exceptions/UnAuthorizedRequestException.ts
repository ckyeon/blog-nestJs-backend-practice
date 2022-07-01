import { ForbiddenException } from '@nestjs/common';
import { ErrorCodes } from '../errors/error-definition';

export const UnAuthorizedRequestException = () => {
  return new ForbiddenException(ErrorCodes.UNAUTHORIZED_REQUEST);
};

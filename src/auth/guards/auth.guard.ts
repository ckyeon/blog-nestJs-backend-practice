import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { ErrorCodes } from '../../errors/error-definition';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validate(request);
  }

  // 로그인 체크
  private validate(request: any): boolean {
    if (!request.headers.authorization) {
      throw new UnauthorizedException(ErrorCodes.LOGIN_REQUIRED);
    }
    const token = request.headers.authorization.replace(/^Bearer /, '');
    this.authService.verifyToken(token);
    return true;
  }
}

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TUserRole } from '../enum/user-roles.enum';
import { Reflector } from '@nestjs/core';
import { UnAuthorizedRequestException } from '../../exceptions/UnAuthorizedRequestException';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // 컨트롤러 @Roles() 데코레이터에서 지정한 값이 들어옴
    const roles = this.reflector.get<TUserRole[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const request: any = context.switchToHttp().getRequest();
    // auth.middleware에서 req에 user 정보를 넣어줌
    const user = request.user;

    if (!user) {
      throw new UnAuthorizedRequestException();
    }

    if (!roles.includes(user.role)) {
      throw new UnAuthorizedRequestException();
    }

    return true;
  }
}

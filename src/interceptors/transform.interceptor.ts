import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Response } from '../types/response';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const res = context.switchToHttp().getResponse();
    const status = res.statusCode;
    return next.handle().pipe(
      map((data) => {
        // const timezoneOffset = new Date().getTimezoneOffset() * 60000;
        // data.map((data) => {
        //
        // });
        //
        return { status, data };
      })
    );
  }
}

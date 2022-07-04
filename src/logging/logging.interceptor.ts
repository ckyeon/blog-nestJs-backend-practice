import { CallHandler, ExecutionContext, Inject, Injectable, LoggerService, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { method, url } = context.switchToHttp().getRequest();
    this.logger.log(`Request to ${method} ${url}`);

    return next.handle().pipe(
      tap((data) =>
        this.logger.log(`Response from ${method} ${url}\n
                         Response: ${JSON.stringify(data, null, 2)}`)
      )
    );
  }
}

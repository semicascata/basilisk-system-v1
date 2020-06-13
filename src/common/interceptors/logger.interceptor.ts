import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger('LoggingInterceptor');
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // get request method
    const contextStack = context.getArgs()[0].route.stack[0].method;
    // get path from request
    const contextPath = context.getArgs()[0].route.path;
    // status code
    const contextStatus = context.getArgs()[1].statusCode;

    return next.handle().pipe(
      tap(() => {
        this.logger.log(
          `[${contextStatus}] ${contextStack.toUpperCase()} { ${contextPath} }`,
        );
      }),
    );
  }
}

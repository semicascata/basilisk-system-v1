import {
  Catch,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

// http exception filter
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger('HttpException');

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    const status = exception.getStatus();

    this.logger.error(`[${status}] ${req.method.toUpperCase()} { ${req.url} }`);

    // custom exception response
    res.status(status).json({
      statusCode: status,
      message: `${exception.message} ❌`,
      timestamp: new Date().toISOString(),
      path: req.url,
      method: req.method,
    });
  }
}

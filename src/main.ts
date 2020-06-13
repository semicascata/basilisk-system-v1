import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {
  Logger,
  InternalServerErrorException,
  ValidationPipe,
} from '@nestjs/common';
import * as helmet from 'helmet';
import * as xss from 'xss-clean';
import * as rateLimit from 'express-rate-limit';
import * as bodyParser from 'body-parser';
import { HttpExceptionFilter, LoggingInterceptor } from './common';
import { PORT, NODE_ENV } from './config';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const logger = new Logger('Bootstrap');

    app.enableCors(); // cors
    app.use(helmet()); // helmet security
    app.use(xss()); // xss-clean

    // body-parser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // express-rate-limit
    app.use(
      rateLimit({
        windowMs: 10 * 60 * 1000, // 10 min
        max: 1000,
        message: 'Too many requests, bro!',
      }),
    );

    // interceptors
    // app.useGlobalFilters(new HttpExceptionFilter());

    if (NODE_ENV === 'development') {
      // request logger
      app.useGlobalInterceptors(new LoggingInterceptor());
    }

    // pipes
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(PORT);
    logger.log(`🚀 Server running on: http://localhost:${PORT}/bslsk/v1/`);
  } catch (err) {
    this.logger.error('❌ Error starting server', err);
    throw new InternalServerErrorException(err);
  }
}

// making sure
bootstrap().catch(err => {
  throw err;
});

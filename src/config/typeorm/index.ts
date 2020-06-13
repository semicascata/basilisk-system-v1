import { Injectable, Logger } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TYPEORM_TYPE } from '../index';
import {
  TYPEORM_HOST,
  TYPEORM_PORT,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_DATABASE,
} from '../environment';
import { createConnection } from 'typeorm';
import { User } from '../../modules/user/entity/user.entity';
import { ClockSys } from '../../modules/clocksys/entity/clocksys.entity';

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
  private logger = new Logger('Database');

  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    const options: any = {
      type: TYPEORM_TYPE!,
      host: TYPEORM_HOST!,
      port: TYPEORM_PORT,
      username: TYPEORM_USERNAME!,
      password: TYPEORM_PASSWORD!,
      database: TYPEORM_DATABASE!,
      entities: [User, ClockSys],
      synchronize: true,
    } as TypeOrmModuleOptions;

    createConnection(options)
      .then(() => {
        this.logger.log('💾 Database connected');
      })
      .catch(err => {
        this.logger.error('❌ Database error', err);
      });

    return options;
  }
}

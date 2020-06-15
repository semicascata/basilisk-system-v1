import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmService } from '../config/typeorm/index';
import { UserModule } from '../modules/user/user.module';
import { ClocksysModule } from '../modules/clocksys/clocksys.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { CompanyModule } from '../modules/company/company.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService,
    }),
    UserModule,
    ClocksysModule,
    AuthModule,
    CompanyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

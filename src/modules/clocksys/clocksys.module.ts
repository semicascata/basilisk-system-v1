import { Module } from '@nestjs/common';
import { ClocksysController } from './clocksys.controller';
import { ClockSysService } from './clocksys.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClockRepository } from './clocksys.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ClockRepository])],
  controllers: [ClocksysController],
  providers: [ClockSysService],
})
export class ClocksysModule {}

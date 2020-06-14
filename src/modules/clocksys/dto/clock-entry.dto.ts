import { Status } from '../entity/clocksys.entity';
import { IsNotEmpty, IsEnum } from 'class-validator';

export class ClockEntry {
  // @IsNotEmpty()
  // times: Date;

  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;
}

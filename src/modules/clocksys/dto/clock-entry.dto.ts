import { Status } from '../entity/clocksys.entity';
import { IsNotEmpty } from 'class-validator';

export class ClockEntry {
  @IsNotEmpty()
  times: Date;

  @IsNotEmpty()
  status: Status;
}

import { Injectable } from '@nestjs/common';
import { ClockRepository } from './clocksys.repository';
import { User } from '../user/entity/user.entity';
import { ClockSys } from './entity/clocksys.entity';
import { ClockEntry } from './dto/clock-entry.dto';

@Injectable()
export class ClockSysService {
  constructor(private clockSysRepository: ClockRepository) {}

  // new entry
  async newEntry(user: User): Promise<ClockSys> {
    return this.clockSysRepository.newEntry(user);
  }

  // find entries
  async findEntries(): Promise<ClockSys[]> {
    return this.clockSysRepository.findEntries();
  }
}

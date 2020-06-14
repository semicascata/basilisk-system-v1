import { EntityRepository, Repository } from 'typeorm';
import { ClockSys, Status } from './entity/clocksys.entity';
import { Logger, InternalServerErrorException } from '@nestjs/common';
import { User, Role } from '../user/entity/user.entity';
import { ClockEntry } from './dto/clock-entry.dto';

@EntityRepository(ClockSys)
export class ClockRepository extends Repository<ClockSys> {
  private logger = new Logger('ClockSysRepository');

  // new entry
  async newEntry(user: User, clockEntry: ClockEntry): Promise<ClockSys> {
    const { status } = clockEntry;
    const entry = new ClockSys();
    entry.times = new Date();
    entry.status = status;
    entry.user = user;

    try {
      await this.save(entry);
      delete user.password;
      this.logger.verbose(
        `New entry added: ${entry.times}, User: "${user.username}"`,
      );

      return entry;
    } catch (err) {
      this.logger.error('Error adding new entry');
      throw new InternalServerErrorException(err);
    }
  }

  // find entries
  async findEntries(): Promise<ClockSys[]> {
    const query = this.createQueryBuilder('time');
    const times = await query.getMany();
    return times;
  }
}

import { Controller, Post, Get } from '@nestjs/common';
import { ClockSysService } from './clocksys.service';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { User } from '../user/entity/user.entity';
import { ClockEntry } from './dto/clock-entry.dto';

@Controller('bslsk/v1/clocksys')
export class ClocksysController {
  constructor(private clockSysService: ClockSysService) {}

  // new entry
  @Post()
  newEntry(@GetUser() user: User) {
    return this.clockSysService.newEntry(user);
  }

  // find entries
  @Get()
  findEntries() {
    return this.clockSysService.findEntries();
  }
}

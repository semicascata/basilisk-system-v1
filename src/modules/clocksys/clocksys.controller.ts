import { Controller, Post, Get, UseGuards } from '@nestjs/common';
import { ClockSysService } from './clocksys.service';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { User } from '../user/entity/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('bslsk/v1/clocksys')
@UseGuards(AuthGuard('jwt'))
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

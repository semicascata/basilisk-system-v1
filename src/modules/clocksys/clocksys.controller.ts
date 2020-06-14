import { Controller, Post, Get, UseGuards, Body } from '@nestjs/common';
import { ClockSysService } from './clocksys.service';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { User, Role } from '../user/entity/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { AuthRole } from 'src/common/decorators/roles-auth.decorator';
import { ClockEntry } from './dto/clock-entry.dto';

@Controller('bslsk/v1/clocksys')
@UseGuards(AuthGuard('jwt'))
export class ClocksysController {
  constructor(private clockSysService: ClockSysService) {}

  // new entry
  @Post()
  newEntry(@GetUser() user: User, @Body() clockEntry: ClockEntry) {
    return this.clockSysService.newEntry(user, clockEntry);
  }

  // find entries
  @Get()
  @AuthRole(Role.admin)
  findEntries() {
    return this.clockSysService.findEntries();
  }
}

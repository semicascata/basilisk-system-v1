import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User, Role } from './entity/user.entity';
import { NewUserDto } from './dto/user.dto';
import { AuthRole } from 'src/common/decorators/roles-auth.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('bslsk/v1/auth')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @AuthRole(Role.admin)
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  @AuthRole(Role.admin)
  async getUser(@Param('id') id: string): Promise<User> {
    return this.userService.getUser(id);
  }

  @Post()
  async addUser(@Body() newUserDto: NewUserDto): Promise<User> {
    return this.userService.addUser(newUserDto);
  }

  @Delete(':id')
  @AuthRole(Role.admin)
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleleteUser(id);
  }
}

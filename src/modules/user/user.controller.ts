import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { NewUserDto } from './dto/user.dto';

@Controller('bslsk/v1/auth')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.userService.getUser(id);
  }

  @Post()
  async addUser(@Body() newUserDto: NewUserDto): Promise<User> {
    return this.userService.addUser(newUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleleteUser(id);
  }
}

import {
  Injectable,
  Logger,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './user.repository';
import { User } from './entity/user.entity';
import { NewUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  private logger = new Logger('UserService');
  constructor(private userRepository: UsersRepository) {}

  // return users (admin only)
  async getUsers(): Promise<User[]> {
    return this.userRepository.getUsers();
  }

  // return user by id
  async getUser(id: string): Promise<User> {
    return this.userRepository.getUser(id);
  }

  // register new user
  async addUser(newUserDto: NewUserDto): Promise<User> {
    return this.userRepository.addUser(newUserDto);
  }

  // delete user
  async deleleteUser(id: string): Promise<Object> {
    const user = await this.userRepository.findOne(id);

    try {
      await this.userRepository.remove(user);
      this.logger.verbose('User deleted:' + user.username);
      return {
        message: 'User deleted',
        userName: user.username,
      };
    } catch (err) {
      this.logger.error('No user founded by id: ' + id);
      throw new InternalServerErrorException(
        'Error trying to delete user or user does not exist',
      );
    }
  }
}

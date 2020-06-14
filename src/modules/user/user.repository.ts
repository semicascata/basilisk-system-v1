import { EntityRepository, Repository } from 'typeorm';
import { User, Role } from './entity/user.entity';
import { NewUserDto } from './dto/user.dto';
import {
  Logger,
  InternalServerErrorException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  private logger = new Logger('UsersRepository');

  // return users (admin only)
  async getUsers(): Promise<User[]> {
    const users = await this.createQueryBuilder('user').getMany();

    try {
      if (users.length === 0) {
        throw new NotFoundException();
      }

      this.logger.verbose('Retrieving users');

      // excluding password
      users.forEach(user => {
        delete user.password;
      });

      return users;
    } catch (err) {
      this.logger.error('Error retrieving users or database is empty');
      throw new NotFoundException(err.message);
    }
  }

  // return user by id
  async getUser(id: string): Promise<User> {
    const user = await this.createQueryBuilder('user')
      .where('user.id = :id', {
        id: id,
      })
      .getOne();

    try {
      this.logger.verbose(`Retrieving user "${user.username}"`);
      delete user.password;
      return user;
    } catch (err) {
      this.logger.error('User not found');
      throw new NotFoundException(err.message);
    }
  }

  // get user by username
  async findUserByUsername(username: string): Promise<User> {
    const user = await this.createQueryBuilder('user')
      .where('user.username = :username', { username: username })
      .getOne();

    return user;
  }

  // register new user
  async addUser(newUserDto: NewUserDto): Promise<User> {
    const { username, email, password, confirm_password, role } = newUserDto;
    const newUser = new User();

    // check password
    if (password !== confirm_password) {
      this.logger.error('Passwords does not match');
      throw new ConflictException('Passwords does not match');
    }

    newUser.username = username;
    newUser.email = email;
    newUser.password = password;

    // testing only
    newUser.role ? (newUser.role = Role.user) : (newUser.role = role);

    try {
      await this.save(newUser);
      this.logger.verbose(`New user "${newUser.username}" registered`);

      // excluding password
      delete newUser.password;

      return newUser;
    } catch (err) {
      if (err.code === '23505') {
        this.logger.error('User/email already exist');
        throw new ConflictException('User/email already exist');
      } else {
        this.logger.error('Failed to register user', err.message);
        throw new InternalServerErrorException('Failed to register user');
      }
    }
  }

  // bcrypt - compare password
  async comparePassword(pass1: string, pass2: string): Promise<Boolean> {
    const isMatch = await bcrypt.compare(pass1, pass2);

    if (isMatch) {
      return true;
    } else {
      return false;
    }
  }
}

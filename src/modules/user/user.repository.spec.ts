import * as bcrypt from 'bcryptjs';
import { Test } from '@nestjs/testing';
import { UsersRepository } from './user.repository';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

const mockCredentialsDto = {
  username: 'testUser',
  email: 'test@gmail.com',
  password: '123123',
  confirm_password: '123123',
  userId: '005969f8-9cf7-432d-a107-c52c74e64f7a',
};

describe('UserRepository', () => {
  let userRepository: any;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UsersRepository],
    }).compile();

    userRepository = module.get<UsersRepository>(UsersRepository);
  });

  describe('addUser', () => {
    let save: any;

    beforeEach(() => {
      save = jest.fn().mockReturnValue({ save });
    });

    it('new user registered', () => {
      save.mockResolvedValue(undefined);
      expect(userRepository.addUser(mockCredentialsDto)).resolves.not.toThrow();
    });

    it('throws a conflict exception as user already exists', () => {
      save.mockRejectedValue({ code: '23505' });
      expect(userRepository.addUser(mockCredentialsDto)).rejects.toThrow(
        ConflictException,
      );
    });

    it('throws a conflict exception as username already exists', () => {
      save.mockRejectedValue({ code: '123123' }); // unhandled error code
      expect(userRepository.addUser(mockCredentialsDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});

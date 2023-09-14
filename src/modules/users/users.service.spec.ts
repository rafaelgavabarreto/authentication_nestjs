import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { mockDeep } from 'jest-mock-extended';
import { PrismaClient, User } from '@prisma/client';
import { PrismaService } from '../../config/prisma/prisma.service';

describe('Testing UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  const testUser: User = {
    user_id: '7fe2daf3-cd68-4811-b2db-ffd8b36ab15f',
    email: 'r@r.com',
    password: 'asd',
    first_name: 'Rafael',
    last_name: 'Barreto',
    created_at: new Date('2023-09-12T15:23:39.194Z'),
    updated_at: new Date('2023-09-12T15:23:39.194Z'),
  };

  it('returns all users', async () => {
    prisma.user.findMany = jest.fn().mockReturnValueOnce([testUser]);
    expect(await service.findAll({})).toStrictEqual([testUser]);
  });

  it('returns user by Pk', async () => {
    prisma.user.findUnique = jest.fn().mockReturnValueOnce(testUser);
    expect(await service.findOne({ user_id: testUser.user_id })).toStrictEqual(
      testUser,
    );
  });

  it('should update the user', async () => {
    testUser.first_name = 'Rafa';
    prisma.user.update = jest.fn().mockReturnValueOnce(testUser);
    expect(await service.update(testUser.user_id, testUser)).toStrictEqual(
      testUser,
    );
  });

  it('should delete the user', async () => {
    testUser.first_name = 'Rafa';
    prisma.user.update = jest.fn().mockReturnValueOnce({});
    expect(await service.remove(testUser.user_id)).toStrictEqual(undefined);
  });
});

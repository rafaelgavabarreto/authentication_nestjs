import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  private saltOrRounds = 10;

  private encryptPassword(password: string) {
    return bcrypt.hash(password, this.saltOrRounds);
  }

  async create(data: Prisma.UserCreateInput) {
    data.password = await this.encryptPassword(data.password);
    Logger.log(`Creating user: ${data.email}`);
    return this.prisma.user.create({
      data,
    });
    // return 'This action adds a new user';
  }

  async signIn(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: { email: email },
      select: { user_id: true, email: true, password: true },
    });
    if (!user) {
      return null;
    }
    const isMatch = bcrypt.compare(password, user!.password);
    if (!user?.password || !isMatch) {
      return null;
    }
    // this.logger.log(`signIn user: ${user.email}`);

    return user;
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationAndSearchRelevanceInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
    // return `This action returns all users`;
  }

  findOne(user: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: user,
    });
    // return `This action returns a #${id} user`;
  }

  update(user_id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { user_id },
      data,
    });
    // return `This action updates a #${id} user`;
  }

  remove(user_id: string): Promise<User> {
    return this.prisma.user.delete({
      where: { user_id },
    });
    // return `This action removes a #${id} user`;
  }
}

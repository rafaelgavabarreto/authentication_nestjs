import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll({});
  }

  @Get(':user_id')
  findOne(@Param('user_id') user_id: string): Promise<User> {
    return this.usersService.findOne({ user_id });
  }

  @Patch(':user_id')
  update(
    @Param('user_id') user_id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update({
      where: { user_id },
      data: updateUserDto,
    });
  }

  @Delete(':user_id')
  remove(@Param('user_id') user_id: string) {
    return this.usersService.remove({ user_id });
  }
}

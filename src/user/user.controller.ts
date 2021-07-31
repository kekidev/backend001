import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
// test
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId')
  getUser(@Param('userId', ParseIntPipe) userId: number) {
    const user = this.userService.getUser(userId);

    if (!user) {
      return {
        statusCode: 404,
        message: 'User not found',
      };
    }

    return user;
  }

  @Get()
  async showAllUsers() {
    const users = await this.userService.showAll();
    return {
      statusCode: 200,
      message: 'Users fetched successfully',
      users,
    };
  }

  @Post()
  async createUser(@Body() data: UserDTO) {
    try {
      const user = await this.userService.create(data);
      return {
        statusCode: 200,
        message: 'Users fetched successfully',
        user,
      };
    } catch (err) {
      return {
        statusCode: 400,
        message:
          err.code == 'ER_DUP_ENTRY'
            ? 'This email is already taken!'
            : 'Other error',
      };
    }
  }
}

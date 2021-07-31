import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async showAll() {
    return await this.userRepository.find();
  }

  /**
   * Get user by id
   *
   * @param  {number} id
   */
  async getUser(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (user == undefined) {
      return undefined;
    }

    return user;
  }

  async deleteUserById(id: number) {
    try {
      await this.userRepository.delete(id);
    } catch (err) {
      console.log(err);
    }

    return {
      statusCode: 200,
      message: 'Users fetched successfully',
    };
  }

  /**
   * @param  {UserDTO} data
   */

  async create(data: UserDTO) {
    const user = this.userRepository.create(data);
    await this.userRepository.save(data);
    return user;
  }
}

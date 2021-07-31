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
   * @param  {number} id
   */
  async getUser(id: number) {
    // * if user is not found return 404

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

  /**
   * @param  {UserDTO} data
   */

  async create(data: UserDTO) {
    const user = this.userRepository.create(data);
    await this.userRepository.save(data);
    return user;
  }
}

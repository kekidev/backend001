import { Catch } from '@nestjs/common';
import { IsString, MaxLength, MinLength } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  QueryFailedError,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 12 })
  @MinLength(4)
  @MaxLength(12)
  @IsString()
  username: string;

  @Column()
  @IsString()
  password: string;

  @Column({ unique: true })
  @IsString()
  email: string;
}

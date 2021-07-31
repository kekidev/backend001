import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UserDTO {
  @IsNotEmpty({ message: 'username field is required' })
  @IsString()
  @Length(4, 12)
  username: string;

  @IsNotEmpty({ message: 'password field is required' })
  @IsString()
  password: string;

  @IsNotEmpty({ message: 'email field is required' })
  @IsString()
  email: string;
}

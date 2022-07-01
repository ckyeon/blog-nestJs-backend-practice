import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { TUserDevice } from '../schema/enum/user-devices.enum';

export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  // @IsString()
  // device: TUserDevice;
}

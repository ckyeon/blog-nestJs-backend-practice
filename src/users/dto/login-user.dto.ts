import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserFieldType } from '../schema/user.schema';
import { AuthFieldType } from '../../auth/schema/auth.schema';

type FieldType = Pick<UserFieldType & AuthFieldType, 'email' | 'password'>;

export class LoginUserDto implements FieldType {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

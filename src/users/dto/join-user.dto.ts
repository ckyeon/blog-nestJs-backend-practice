import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { UserFieldType } from '../schema/user.schema';
import { AuthFieldType } from '../../auth/schema/auth.schema';

type FieldType = Pick<UserFieldType & AuthFieldType, 'email' | 'password' | 'name' | 'phone'>;

export class JoinUserDto implements FieldType {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z\d!@#$%&*()]+$/)
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @Matches(/^\+?\d+$/)
  @IsNotEmpty()
  phone: string;
}

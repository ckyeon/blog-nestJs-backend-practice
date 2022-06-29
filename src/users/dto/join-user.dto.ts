import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class JoinUserDto {
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
  @Matches(/^[a-zA-Z\d!@#$%&*()]+$/)
  @IsNotEmpty()
  phone: string;
}

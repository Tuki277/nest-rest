import { IsEmail, IsNotEmpty, IsInt, IsString } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class UserRegisterDto {
  @ApiPropertyOptional({ type: String })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  firstName: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  lastName: string;

  @ApiPropertyOptional({ type: Number })
  @IsInt()
  age: number;

  roles: string[];

  passwordSalt: string;
}

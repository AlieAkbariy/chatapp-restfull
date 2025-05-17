import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'Username', example: 'string' })
  @Expose()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'Password', example: 'string' })
  @Expose()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: 'User ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Username', example: 'johndoe' })
  username: string;

  @ApiProperty({ description: 'Name', example: 'John Doe' })
  name: string;
} 
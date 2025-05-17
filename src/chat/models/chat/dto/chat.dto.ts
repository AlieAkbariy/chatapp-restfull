import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateRoomDto {
  @ApiProperty({ description: 'Room name', example: 'General' })
  @Expose()
  name: string;
}

export class SendMessageDto {
  @ApiProperty({ description: 'Message content', example: 'Hello, world!' })
  @Expose()
  content: string;
}

export class ChatRoomDto {
  @ApiProperty({ description: 'Room ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Room name', example: 'General' })
  name: string;

  @ApiProperty({
    description: 'Created at',
    example: '2024-05-18T12:00:00.000Z',
  })
  createdAt: string;

  @ApiProperty({
    description: 'Updated at',
    example: '2024-05-18T12:00:00.000Z',
    required: false,
  })
  updatedAt?: string;
}

export class MessageUserDto {
  @ApiProperty({ description: 'User ID', example: 1 })
  id: number;
  @ApiProperty({ description: 'Username', example: 'johndoe' })
  username: string;
  @ApiProperty({ description: 'Name', example: 'John Doe' })
  name: string;
}

export class MessageDto {
  @ApiProperty({ description: 'Message ID', example: 1 })
  id: number;
  @ApiProperty({ description: 'Message content', example: 'Hello, world!' })
  content: string;
  @ApiProperty({
    description: 'Created at',
    example: '2024-05-18T12:00:00.000Z',
  })
  createdAt: string;
  @ApiProperty({ type: MessageUserDto })
  user: MessageUserDto;
}

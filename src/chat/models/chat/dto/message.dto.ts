import { ApiProperty } from '@nestjs/swagger';
import { MessageUserDto } from './message-user.dto';

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
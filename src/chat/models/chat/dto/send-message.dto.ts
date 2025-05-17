import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SendMessageDto {
  @ApiProperty({ description: 'Message content', example: 'Hello, world!' })
  @Expose()
  content: string;
} 
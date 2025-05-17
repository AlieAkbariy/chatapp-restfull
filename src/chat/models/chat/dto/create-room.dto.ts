import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateRoomDto {
  @ApiProperty({ description: 'Room name', example: 'General' })
  @Expose()
  name: string;
} 
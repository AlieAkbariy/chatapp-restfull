import { ApiProperty } from '@nestjs/swagger';

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

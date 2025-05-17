import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BaseExceptionDto {
  @ApiProperty({ description: 'HTTP status code', example: 400 })
  statusCode: number;

  @ApiProperty({
    description: 'Error message',
    example: 'Invalid username or password.',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Error type or details',
    example: 'BadRequest',
  })
  error?: string;
}

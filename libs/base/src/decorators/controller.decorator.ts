import { applyDecorators } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Controller as NestController } from '@nestjs/common';

export function Controller(route: string, version?: string) {
  return applyDecorators(
    ApiTags(route),
    NestController({ path: route, version: version || '1' }),
  );
}

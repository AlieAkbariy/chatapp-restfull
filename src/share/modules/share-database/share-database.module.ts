import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ShareDatabaseModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
    const synchronize =
      configService.getOrThrow<string>('PRODUCTION') === 'true' ? true : false;
    return {
      type: 'postgres',
      host: configService.getOrThrow<string>('DB_HOST'),
      port: +configService.getOrThrow<number>('DB_PORT'),
      username: configService.getOrThrow<string>('DB_USERNAME'),
      password: configService.getOrThrow<string>('DB_PASSWORD'),
      database: configService.getOrThrow<string>('DB_DATABASE'),
      autoLoadEntities: true,
      synchronize,
    };
  },
});

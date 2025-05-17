import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

const NODE_ENV = process.env.NODE_ENV;

const ShareConfigModule = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: NODE_ENV ? `env/.env.${NODE_ENV}` : 'env/.env',
});

@Module({
  imports: [ShareConfigModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

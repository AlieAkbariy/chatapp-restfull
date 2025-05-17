import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

const NODE_ENV = process.env.NODE_ENV;

const ShareConfigModule = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: NODE_ENV ? `env/.env.${NODE_ENV}` : 'env/.env',
});

@Module({
  imports: [ShareConfigModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

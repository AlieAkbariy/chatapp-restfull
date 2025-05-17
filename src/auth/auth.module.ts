import { Module } from '@nestjs/common';
import { ShareModule } from 'src/share/share.module';
import { AuthController } from './apps/controllers/auth.controller';
import { AuthService } from './apps/services/auth.service';

@Module({
  imports: [ShareModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

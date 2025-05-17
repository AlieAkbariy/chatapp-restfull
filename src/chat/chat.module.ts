import { Module } from '@nestjs/common';
import { ChatController } from './apps/controllers/chat.controller';
import { ChatService } from './apps/services/chat.service';
import { ShareModule } from 'src/share/share.module';

@Module({
  imports: [ShareModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}

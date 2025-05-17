import { Body, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ChatService } from '../services/chat.service';
import { CreateRoomDto } from 'src/chat/models/chat/dto/create-room.dto';
import { SendMessageDto } from 'src/chat/models/chat/dto/send-message.dto';
import { ChatRoomDto } from 'src/chat/models/chat/dto/chat-room.dto';
import { MessageDto } from 'src/chat/models/chat/dto/message.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Controller } from '@libs/base';
import { User } from 'src/auth/decorators/user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('rooms')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new chat room' })
  @ApiBody({ type: CreateRoomDto })
  @ApiResponse({
    status: 201,
    description: 'Chat room created.',
    type: ChatRoomDto,
  })
  async createRoom(
    @Body() body: CreateRoomDto,
    @User() user,
  ): Promise<ChatRoomDto> {
    return this.chatService.createRoom(body, user);
  }

  @Get('rooms')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all chat rooms' })
  @ApiResponse({
    status: 200,
    description: 'List of chat rooms.',
    type: [ChatRoomDto],
  })
  async getAllRooms(): Promise<ChatRoomDto[]> {
    return this.chatService.getAllRooms();
  }

  @Post('rooms/:roomId/join')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Join an existing chat room' })
  @ApiResponse({ status: 200, description: 'Joined chat room.' })
  async joinRoom(@Param('roomId') roomId: number, @User() user) {
    return this.chatService.joinRoom(roomId, user);
  }

  @Post('rooms/:roomId/messages')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Send a message in a chat room' })
  @ApiBody({ type: SendMessageDto })
  @ApiResponse({ status: 201, description: 'Message sent.', type: MessageDto })
  async sendMessage(
    @Param('roomId') roomId: number,
    @Body() body: SendMessageDto,
    @User() user,
  ): Promise<MessageDto> {
    return this.chatService.sendMessage(roomId, body, user);
  }

  @Get('rooms/:roomId/messages')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retrieve messages in a chat room' })
  @ApiResponse({
    status: 200,
    description: 'List of messages.',
    type: [MessageDto],
  })
  async getMessages(
    @Param('roomId') roomId: number,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ): Promise<MessageDto[]> {
    return this.chatService.getMessages(roomId, limit, offset);
  }
}

import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/share/services/prisma.service';
import { CreateRoomDto } from 'src/chat/models/chat/dto/create-room.dto';
import { SendMessageDto } from 'src/chat/models/chat/dto/send-message.dto';
import { ChatRoomDto } from 'src/chat/models/chat/dto/chat-room.dto';
import { MessageDto } from 'src/chat/models/chat/dto/message.dto';
import { MessageUserDto } from 'src/chat/models/chat/dto/message-user.dto';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async createRoom(body: CreateRoomDto, user: any): Promise<ChatRoomDto> {
    const room = await this.prisma.chatRoom.create({
      data: { name: body.name },
    });
    return {
      id: room.id,
      name: room.name,
      createdAt: room.createdAt.toISOString(),
      updatedAt: room.updatedAt?.toISOString(),
    };
  }

  async getAllRooms(): Promise<ChatRoomDto[]> {
    const rooms = await this.prisma.chatRoom.findMany({
      orderBy: { createdAt: 'asc' },
    });
    return rooms.map((room) => ({
      id: room.id,
      name: room.name,
      createdAt: room.createdAt.toISOString(),
      updatedAt: room.updatedAt?.toISOString(),
    }));
  }

  async joinRoom(roomId: number, user: any) {
    const room = await this.prisma.chatRoom.findUnique({
      where: { id: roomId },
    });
    if (!room) throw new NotFoundException('Chat room not found');
    // Prevent duplicate join
    const exists = await this.prisma.chatRoomMember.findUnique({
      where: { userId_chatRoomId: { userId: user.id, chatRoomId: roomId } },
    });
    if (exists) throw new BadRequestException('User already joined this room');
    return this.prisma.chatRoomMember.create({
      data: { userId: user.id, chatRoomId: roomId },
    });
  }

  async sendMessage(
    roomId: number,
    body: SendMessageDto,
    user: any,
  ): Promise<MessageDto> {
    const room = await this.prisma.chatRoom.findUnique({
      where: { id: roomId },
    });
    if (!room) throw new NotFoundException('Chat room not found');
    const message = await this.prisma.message.create({
      data: { content: body.content, userId: user.id, chatRoomId: roomId },
      include: { user: true },
    });
    return {
      id: message.id,
      content: message.content,
      createdAt: message.createdAt.toISOString(),
      user: {
        id: message.user.id,
        username: message.user.username,
        name: message.user.name,
      },
    };
  }

  async getMessages(
    roomId: number,
    limit = 50,
    offset = 0,
  ): Promise<MessageDto[]> {
    const room = await this.prisma.chatRoom.findUnique({
      where: { id: roomId },
    });
    if (!room) throw new NotFoundException('Chat room not found');
    const messages = await this.prisma.message.findMany({
      where: { chatRoomId: roomId },
      orderBy: { createdAt: 'asc' },
      skip: offset,
      take: limit,
      include: { user: true },
    });
    return messages.map((message) => ({
      id: message.id,
      content: message.content,
      createdAt: message.createdAt.toISOString(),
      user: {
        id: message.user.id,
        username: message.user.username,
        name: message.user.name,
      },
    }));
  }
}

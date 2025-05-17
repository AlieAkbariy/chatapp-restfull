import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/auth/models/auth/dto/register.dto';
import { encrypt } from 'src/auth/utils/bcrypt';
import { PrismaService } from 'src/share/services/prisma.service';
import * as jwt from 'jsonwebtoken';
import { compare } from 'src/auth/utils/bcrypt';
import { LoginDto } from 'src/auth/models/auth/dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { UserDto } from 'src/auth/models/auth/dto/user.dto';
import { AccessTokenDto } from 'src/auth/models/auth/dto/access-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async register(body: RegisterDto): Promise<UserDto> {
    const exists = await this.prismaService.user.findFirst({
      where: { username: body.username },
    });
    if (exists) {
      throw new BadRequestException('User with this username exists.');
    }

    const encryptedPassword = await encrypt(body.password);
    const user = await this.prismaService.user.create({
      data: {
        username: body.username,
        name: body.name,
        password: encryptedPassword,
      },
    });
    // Map to UserDto
    return { id: user.id, username: user.username, name: user.name };
  }

  async login(body: LoginDto): Promise<AccessTokenDto> {
    const user = await this.prismaService.user.findFirst({
      where: { username: body.username },
    });
    if (!user) {
      throw new BadRequestException('Invalid username or password.');
    }
    const isPasswordValid = await compare(body.password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid username or password.');
    }
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      this.configService.get<string>('JWT_SECRET', { infer: true }) ||
        'dev_secret',
      { expiresIn: '1h' },
    );
    return { access_token: token };
  }
}

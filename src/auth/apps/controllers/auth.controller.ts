import { Controller } from '@libs/base';
import { Body, Post } from '@nestjs/common';
import { RegisterDto } from 'src/auth/models/auth/dto/register.dto';
import { AuthService } from '../services/auth.service';
import { LoginDto } from 'src/auth/models/auth/dto/login.dto';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UserDto } from 'src/auth/models/auth/dto/user.dto';
import { AccessTokenDto } from 'src/auth/models/auth/dto/access-token.dto';
import { BaseExceptionDto } from '@libs/base/dto/base-exception.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully.',
    type: UserDto,
  })
  @ApiResponse({
    status: 400,
    description: 'User with this username exists.',
    type: BaseExceptionDto,
  })
  async register(@Body() body: RegisterDto): Promise<UserDto> {
    return await this.authService.register(body);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login and get JWT token' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 201,
    description: 'JWT token returned.',
    type: AccessTokenDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid username or password.',
    type: BaseExceptionDto,
  })
  async login(@Body() body: LoginDto): Promise<AccessTokenDto> {
    return await this.authService.login(body);
  }
}

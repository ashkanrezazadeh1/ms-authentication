import {
  Controller,
  Get,
  Post,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInputDTO } from './dto/login.input.dto';
import { SignupInputDTO } from './dto/signup.input.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() body: LoginInputDTO) {
    const user = await this.authService.login(body.username, body.password);
    if (user) {
      return user;
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
  @Post('signup')
  async signup(@Body() body: SignupInputDTO) {
    const cf = await this.authService.register(body);
    return {
      message: 'User created successfully',
      data: {
        userId: cf,
      },
    };
  }

  @Get('crash')
  crashServer() {
    // process.kill(process.pid, 'SIGTERM');
    // Schedule the crash to happen outside of the current execution context
    setTimeout(() => {
      throw new Error('Intentional server crash');
    }, 100);

    return { message: 'Server will crash shortly...' };
  }
}

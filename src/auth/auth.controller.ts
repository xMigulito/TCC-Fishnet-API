import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(
    @Body() body: {
      email: string;
      usuario: string;
      password: string;
      cooperativaId: number;
    },
  ) {
    return this.authService.register(
      body.email,
      body.usuario,
      body.password,
      body.cooperativaId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('tanques')
  async getUserTanques(@Request() req) {
    return this.authService.getUserTanques(req.user.id);
  }
}

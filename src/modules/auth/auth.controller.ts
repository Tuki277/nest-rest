import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('AUTH')
@Controller('auth')
@UseInterceptors(new TransformInterceptor())
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Body() userLoginData: UserLoginDto) {
    return this.authService.login(userLoginData);
  }
}

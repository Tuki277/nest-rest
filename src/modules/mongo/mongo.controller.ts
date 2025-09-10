import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { UserRegisterDto } from './dto/new-users.input';
import { MongoService } from './mongo.service';

@Controller('mongo')
@ApiTags('MONGO')
@UseInterceptors(new TransformInterceptor())
export class MongoController {
  constructor(private readonly mongoService: MongoService) {}
  @Post()
  async register(@Body() userRegisterDto: UserRegisterDto) {
    return this.mongoService.saveUser(userRegisterDto);
  }
}

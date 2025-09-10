import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('HEALTH CHECK')
@Controller('health-check')
export class HealthCheckController {
  @Get()
  findAll() {
    return;
  }
}

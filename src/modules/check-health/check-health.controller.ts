import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('check-health')
@Controller('check-health')
export class CheckHealthController {
  @Get()
  findAll() {
    return;
  }
}

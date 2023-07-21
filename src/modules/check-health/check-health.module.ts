import { Module } from '@nestjs/common';
import { CheckHealthController } from './check-health.controller';

@Module({
  controllers: [CheckHealthController],
})
export class CheckHealthModule {}

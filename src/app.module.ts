import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { CheckHealthModule } from './modules/check-health/check-health.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), CheckHealthModule],
})
export class AppModule {}

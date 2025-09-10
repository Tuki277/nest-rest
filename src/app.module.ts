import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MongoModule } from './modules/mongo/mongo.module';
import { typeORMConfig } from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DB}`,
    ),
    UsersModule,
    AuthModule.forRoot({ secret: process.env.JWT_SECRET }),
    MongoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

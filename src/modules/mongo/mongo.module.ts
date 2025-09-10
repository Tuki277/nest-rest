import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoController } from './mongo.controller';
import { MongoRepository } from './mongo.repository';
import { MongoService } from './mongo.service';
import { Users, UsersSchema } from './schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
  ],
  controllers: [MongoController],
  providers: [MongoService, MongoRepository],
  exports: [MongoService],
})
export class MongoModule {}

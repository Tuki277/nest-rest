import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from './schemas/users.schema';
import { MongoRepositoryBase } from 'src/common/base/mongo.repositories';

export class MongoRepository extends MongoRepositoryBase {
  constructor(
    @InjectModel(Users.name) private readonly usersSchema: Model<Users>,
  ) {
    super(usersSchema);
  }
}

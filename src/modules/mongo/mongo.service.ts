import bcrypt from 'bcryptjs';
import { ConflictException, Injectable } from '@nestjs/common';
import { UserRegisterDto } from './dto/new-users.input';
import { MongoRepository } from './mongo.repository';
import { USER_EXISTS } from 'src/common/errors/message.error';

@Injectable()
export class MongoService {
  constructor(private readonly mongoRepository: MongoRepository) {}

  async saveUser(req: UserRegisterDto) {
    const user = await this.findByEmail(req.email);
    if (user) {
      throw new ConflictException(USER_EXISTS);
    }
    const salt = bcrypt.genSaltSync(10);
    req.roles = ['BASE', 'ADMIN'];
    req.password = bcrypt.hashSync(req.password ?? '', salt);
    req.passwordSalt = salt;
    return this.mongoRepository.insertRecord(req);
  }

  findByEmail(email) {
    return this.mongoRepository.findOne({
      where: { email: email },
    });
  }
}

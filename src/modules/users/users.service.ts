import { ConflictException, Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { UserRepository } from './repositories/users.repository';
import { USER_EXISTS } from 'src/common/errors/message.error';
import { UserRegisterDto } from './dto/new-users.input';
import { User } from './entities/user.entity';
import { IQuery } from 'src/common/interfaces/query.interface';
import { UserResponse } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async saveUser(req: UserRegisterDto): Promise<User | undefined> {
    const user = await this.findByEmail(req.email);
    if (user) {
      throw new ConflictException(USER_EXISTS);
    }

    const salt = bcrypt.genSaltSync(10);
    req.roles = ['BASE', 'ADMIN'];
    req.password = bcrypt.hashSync(req.password ?? '', salt);
    req.passwordSalt = salt;
    const userData = this.userRepository.create(req);
    return this.userRepository.save(userData);
  }

  findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { email: email },
    });
  }

  async findAll(query: IQuery) {
    let qb = this.userRepository.createQueryBuilder('u');

    if (query.search && query.field) {
      qb = await this.userRepository._queryLike(
        'u',
        query.field,
        query.search,
        qb,
      );
    }

    if (query.sort && query.field) {
      qb = await this.userRepository._orderBy('u', query.field, query.sort, qb);
    }
    const result = await this.userRepository.parsePaginate(qb, {
      limit: query.limit,
      page: query.page,
    });

    result.items = UserResponse.fromEntities(result.items);
    return result;
  }
}

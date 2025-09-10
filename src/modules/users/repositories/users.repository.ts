import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RepositoryBase } from 'src/common/base/repositories';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository extends RepositoryBase<User> {
  constructor(@InjectRepository(User) repository: Repository<User>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}

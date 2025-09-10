import { Injectable, NotFoundException } from '@nestjs/common';
import { UserLoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { USER_NOT_FOUND } from 'src/common/errors/message.error';
import { UserRepository } from '../users/repositories/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(reqBody: UserLoginDto) {
    const user = await this.userRepository
      .findOneByOrFail({
        email: reqBody.email,
      })
      .catch(() => {
        throw new NotFoundException(USER_NOT_FOUND);
      });
    const check = bcrypt.compareSync(reqBody.password, user.password);
    if (!check) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
    const accessToken = this.jwtService.sign(
      {
        username: user.username,
        email: user.email,
        sub: user.id,
      },
      {
        expiresIn: `30 days`,
      },
    );
    return {
      id: user.id,
      email: user.email,
      accessToken,
    };
  }
}

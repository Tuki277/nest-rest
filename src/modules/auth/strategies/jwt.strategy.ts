import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { AUTH_MODULE_OPTIONS } from '../auth.constants';
import { Payload, AuthModuleOptions } from '../auth.interface';
import { UserRepository } from 'src/modules/users/repositories/users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(AUTH_MODULE_OPTIONS) readonly options: AuthModuleOptions,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: options.secret,
    });
  }

  validate = async (payload: Payload) => {
    try {
      return await this.userRepository
        .findOneByOrFail({
          email: payload.email,
        })
        .catch(() => {
          throw new UnauthorizedException();
        });
    } catch (err) {
      throw new UnauthorizedException();
    }
  };
}

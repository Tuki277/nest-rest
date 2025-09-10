import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { AuthModuleOptions, JWTDecodeValue } from '../auth.interface';
import { AUTH_MODULE_OPTIONS } from '../auth.constants';
import { Request } from 'express';
// import { UserRepository } from 'src/modules/users/repositories/users.repository';

@Injectable()
export class JwtCookieStrategy extends PassportStrategy(Strategy, 'cookie') {
  constructor(
    // private readonly userRepository: UserRepository,
    @Inject(AUTH_MODULE_OPTIONS) readonly options: AuthModuleOptions,
  ) {
    super({
      jwtFromRequest: (req: Request) => {
        return req.cookies.token as string | undefined;
      },
      ignoreExpiration: false,
      secretOrKey: options.secret,
      passReqToCallback: true,
    });
  }

  validate = async (req: Request, payload: JWTDecodeValue) => {
    const accessToken = req?.cookies?.token as string | undefined;
    if (!accessToken) {
      throw new UnauthorizedException();
    }
    try {
      // return await this.userRepository
      //   .findOneByOrFail({
      //     username: payload.username,
      //   })
      //   .catch(() => {
      //     throw new UnauthorizedException();
      //   });
    } catch (err) {
      throw new UnauthorizedException();
    }
  };
}

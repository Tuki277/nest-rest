import { DynamicModule, Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AUTH_MODULE_OPTIONS } from './auth.constants';
import { AuthController } from './auth.controller';
import { AuthModuleOptions } from './auth.interface';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [UsersModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {
  static forRoot(options?: AuthModuleOptions): DynamicModule {
    if (!options?.secret) {
      throw new Error('JwtStrategy requires a secret or key');
    }
    return {
      module: AuthModule,
      providers: [
        {
          provide: AUTH_MODULE_OPTIONS,
          useValue: options,
        },
      ],
      imports: [
        JwtModule.register({
          global: true,
          secret: options?.secret,
          signOptions: { expiresIn: '30 days', issuer: 'golf-salon' },
        }),
      ],
    };
  }
}

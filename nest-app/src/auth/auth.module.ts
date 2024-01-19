import { Module } from '@nestjs/common';
import { AccountModule } from 'src/account/account.module';
import { AuthController } from './api/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './application/strategies/jwt.strategy';
import { AuthService } from './application/auth.service';
import { LocalStrategy } from './application/strategies/local.strategy';
import { ConfigService } from '@nestjs/config';
import { GoogleStrategy } from './application/strategies/google.strategy';
@Module({
  imports: [
    AccountModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
        signOptions: { expiresIn: configService.get('jwt.expiresIn') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, GoogleStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccountService } from 'src/account/application/account.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly accountService: AccountService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJwt,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: true, // TODO: Change this to set expiration token
      secretOrKey: configService.get('jwt.secret'),
    });
  }

  async validate(payload: any) {
    return await this.accountService.findById(payload.sub);
  }

  private static extractJwt(request: Request) {
    if (request.cookies && 'token' in request.cookies) {
      return request.cookies['token'];
    }
    return null;
  }
}

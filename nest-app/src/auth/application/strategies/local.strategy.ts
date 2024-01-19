import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AccountService } from 'src/account/application/account.service';
import { AccountDto } from 'src/account/application/dtos';
import { InvalidEmailOrPasswordException } from 'src/auth/domain/exception';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly accountService: AccountService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<AccountDto> {
    return await this.accountService.validateAccount(email, password);
  }
}

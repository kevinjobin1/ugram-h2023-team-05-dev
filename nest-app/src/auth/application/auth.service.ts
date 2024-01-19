import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Profile } from 'passport-google-oauth20';
import { AccountService } from 'src/account/application/account.service';
import { Account } from 'src/account/domain/account';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(account: Account) {
    return this.jwtService.sign({
      sub: account.userId,
      name: account.name,
      email: account.email,
    });
  }

  async signInWithGoogle(profile: Profile) {
    const { id, name, emails } = profile;
    let account = await this.accountService.findByGoogleId(id);
    if (!account) {
      account = await this.accountService.createWithGoogle(
        `${name.givenName} ${name.familyName}`,
        emails[0].value,
        id,
      );
    }
    return account;
  }

  async findUserIdFromToken(token: string) {
    const { sub } = this.jwtService.verify(token);
    const account = await this.accountService.findById(sub);
    return account ? account.userId : null;
  }
}

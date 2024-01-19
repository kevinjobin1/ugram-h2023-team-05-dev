import { Injectable } from '@nestjs/common';
import { Account } from '../domain/account';

@Injectable()
export class AccountDtoAssembler {
  toResponse(account: Account) {
    const entries = Object.entries(account).map(([key, value]) => {
      if (!value) {
        return [key, null];
      }
      return [key, value];
    });
    return Object.fromEntries(entries);
  }
}

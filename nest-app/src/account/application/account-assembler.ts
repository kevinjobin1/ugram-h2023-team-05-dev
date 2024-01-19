import { Injectable } from '@nestjs/common';
import { Account } from '../domain/account';
import { AccountDto } from './dtos';

@Injectable()
export class AccountAssembler {
  toDto({
    userId,
    name,
    username,
    email,
    phoneNumber,
    creationDate,
  }: Account): AccountDto {
    return { userId, name, username, email, phoneNumber, creationDate };
  }
}

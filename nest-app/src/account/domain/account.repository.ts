import { Account } from './account';

export interface AccountRepository {
  create(account: Account): Promise<Account>;
  update(account: Account): Promise<void>;
  delete (id : string) : Promise<void>;
  findById(id: string): Promise<Account>;
  findByGoogleId(googleId: string): Promise<Account>;
  findByEmail(email: string): Promise<Account>;
}

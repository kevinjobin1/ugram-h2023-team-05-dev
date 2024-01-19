import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account, AccountDocument } from 'src/account/domain/account';
import { AccountRepository } from 'src/account/domain/account.repository';
import { EmailAlreadyTakenException } from 'src/account/domain/exceptions';

export class MongoAccountRepository implements AccountRepository {
  constructor(
    @InjectModel(Account.name) private readonly accountModel: Model<AccountDocument>,
  ) {}

  async create(account: Account): Promise<Account> {
    const isEmailAlreadyTaken = await this.accountModel
      .exists({ email: account.email })
      .exec();
    if (isEmailAlreadyTaken) {
      throw new EmailAlreadyTakenException();
    }
    return await this.accountModel.create(account);
  }
  async update(account: Account): Promise<void> {
    await this.accountModel.updateOne({ userId: account.userId }, account).exec();
  }

  async findById(id: string): Promise<Account> {
    return await this.accountModel.findOne({ userId: id }).exec();
  }

  async findByGoogleId(googleId: string): Promise<Account> {
    return await this.accountModel.findOne({ googleId: googleId });
  }

  async findByEmail(email: string): Promise<Account> {
    return await this.accountModel.findOne({ email: email }).exec();
  }

  async delete(userId: string): Promise<void> {
    await this.accountModel
      .deleteOne({ userId: userId })
      .exec();
  }
}

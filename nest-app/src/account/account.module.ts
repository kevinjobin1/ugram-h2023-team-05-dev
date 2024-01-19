import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from 'src/profile/domain/profile';
import { MongoProfileRepository } from 'src/profile/infrastructure/persistence/profile.mongo.repository';
import { AccountDtoAssembler } from './api/account-dto-assembler';
import { AccountController } from './api/account.controller';
import { AccountAssembler } from './application/account-assembler';
import { AccountService } from './application/account.service';
import { Account, AccountSchema } from './domain/account';
import { MongoAccountRepository } from './infrastructure/persistence/account.mongo.repository';
import { MongoPostsRepository } from 'src/posts/infrastructure/persistence/mongo-posts-repository';
import { Post, PostSchema } from 'src/posts/domain/post';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Account.name, schema: AccountSchema },
      { name: Profile.name, schema: ProfileSchema },
      { name: Post.name, schema: PostSchema },
    ]),
  ],
  providers: [
    AccountDtoAssembler,
    AccountAssembler,
    AccountService,
    { provide: 'AccountRepository', useClass: MongoAccountRepository },
    { provide: 'ProfileRepository', useClass: MongoProfileRepository },
    { provide: 'PostsRepository', useClass: MongoPostsRepository },
  ],
  exports: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}

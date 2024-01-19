import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import { AccountRepository } from '../domain/account.repository';
import { AccountDto } from './dtos';
import { ProfileRepository } from 'src/profile/domain/profile.repository';
import { AccountAssembler } from './account-assembler';
import { PostsRepository } from 'src/posts/domain/posts-repository';
import { InvalidEmailOrPasswordException } from 'src/auth/domain/exception';

@Injectable()
export class AccountService {
  private static readonly SALTS_OR_ROUNDS = 10;

  constructor(
    @Inject('AccountRepository') private readonly accountRepository: AccountRepository,
    @Inject('ProfileRepository') private readonly profileRepository: ProfileRepository,
    private readonly accountAssembler: AccountAssembler,
    @Inject('PostsRepository') private readonly postsRepository: PostsRepository,
  ) {}

  async create(
    name: string,
    email: string,
    username: string,
    phoneNumber: string,
    password: string,
  ) {
    const userId = randomUUID();
    const account = await this.accountRepository.create({
      userId,
      name,
      username,
      email,
      phoneNumber,
      password: await bcrypt.hash(password, AccountService.SALTS_OR_ROUNDS),
      creationDate: new Date(),
    });
    await this.createProfile(userId, name, username);
    return this.accountAssembler.toDto(account);
  }

  async createWithGoogle(name: string, email: string, googleId: string) {
    const userId = randomUUID();
    const account = await this.accountRepository.create({
      userId,
      googleId,
      name,
      username: name,
      email,
      creationDate: new Date(),
    });
    await this.createProfile(userId, name, name);
    return this.accountAssembler.toDto(account);
  }

  private async createProfile(userId: string, name: string, username: string) {
    await this.profileRepository.create({
      userId: userId,
      name: name,
      username: username,
      profilePicture: null,
      posts: null,
      picturesCount: 0,
      followersCount: 0,
      subscribersCount: 0,
      description: '',
    });
  }

  async validateAccount(email: string, password: string) {
    const account = await this.accountRepository.findByEmail(email);

    if (!account || !account.password) {
      throw new InvalidEmailOrPasswordException();
    }

    const passwordMatches = await bcrypt.compare(password, account.password);

    if (!passwordMatches) {
      throw new InvalidEmailOrPasswordException();
    }

    return this.accountAssembler.toDto(account);
  }

  async findById(id: string): Promise<AccountDto> {
    const account = await this.accountRepository.findById(id);
    if (!account) return null;
    return this.accountAssembler.toDto(account);
  }

  async findByGoogleId(googleId: string) {
    const account = await this.accountRepository.findByGoogleId(googleId);
    if (!account) return null;
    return this.accountAssembler.toDto(account);
  }

  async updateAccount(id: string, name: string, email: string, phoneNumber: string) {
    const account = await this.accountRepository.findById(id);
    account.name = name;
    account.email = email;
    account.phoneNumber = phoneNumber;
    await this.accountRepository.update(account);

    const profile = await this.profileRepository.findById(id);
    profile.name = name;
    await this.profileRepository.update(profile);
  }

  async deleteAccount(userId: string) {
    const posts = await this.postsRepository.findByUserId(userId);
    if (posts) {
      for (let i = 0; i < posts.length; i++) {
        await this.postsRepository.delete(posts[i].id);
      }
    }
    await this.accountRepository.delete(userId);
    await this.profileRepository.delete(userId);
  }
}

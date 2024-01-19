import { Inject, Injectable, Logger } from '@nestjs/common';
import { Post } from 'src/posts/domain/post';
import { PostsRepository } from 'src/posts/domain/posts-repository';
import { Profile } from 'src/profile/domain/profile';
import { ProfileRepository } from 'src/profile/domain/profile.repository';

@Injectable()
export class SearchService {
  constructor(
    @Inject('ProfileRepository') private readonly profileRepository: ProfileRepository,
    @Inject('PostsRepository') private readonly postsRepository: PostsRepository,
  ) {}
  private readonly logger = new Logger(SearchService.name);

  async getProfiles(username: string, limit: number): Promise<Profile[]> {
    return await this.profileRepository.findByUsername(username, limit);
  }

  async getPosts(description: string, limit: number): Promise<Post[]> {
    return await this.postsRepository.findByDescription(description, limit);
  }

  async getTags(tag: string, limit: number): Promise<Post[]> {
    return await this.postsRepository.findByTag(tag, limit);
  }
}

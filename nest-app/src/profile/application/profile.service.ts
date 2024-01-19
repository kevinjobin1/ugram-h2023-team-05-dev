import { Inject, Injectable } from '@nestjs/common';
import { Profile } from '../domain/profile';
import { ProfileRepository } from '../domain/profile.repository';
import { PostsRepository } from 'src/posts/domain/posts-repository';
import { ImagesService } from 'src/images/application/images.service';

@Injectable()
export class ProfileService {
  constructor(
    @Inject('ProfileRepository') private readonly profileRepository: ProfileRepository,
    @Inject('PostsRepository') private readonly postsRepository: PostsRepository,
    private readonly imagesService: ImagesService,
  ) {}

  async findById(id: string): Promise<Profile> {
    const posts = await this.postsRepository.findByUserId(id);

    let profile = await this.profileRepository.findById(id);
    profile.posts = posts;

    return profile;
  }

  async findAll(): Promise<Profile[]> {
    let profiles = await this.profileRepository.findAll();

    await Promise.all(
      profiles.map(
        async (p) => (p.posts = await this.postsRepository.findByUserId(p.userId)),
      ),
    );

    return profiles;
  }

  async findByUsername(username: string, limit: number): Promise<Profile[]> {
    let profiles = await this.profileRepository.findByUsername(username, limit);

    return profiles;
  }

  async updateProfilePicture(userId: string, image: Express.Multer.File) {
    const uploadedImage = await this.imagesService.uploadProfilePicture(userId, image);

    let profile = await this.profileRepository.findById(userId);
    profile.profilePicture = uploadedImage.url;

    await this.profileRepository.update(profile);
  }
}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileController } from './api/profile.controller';
import { ProfileService } from './application/profile.service';
import { Profile, ProfileSchema } from './domain/profile';
import { MongoProfileRepository } from './infrastructure/persistence/profile.mongo.repository';
import { MongoPostsRepository } from 'src/posts/infrastructure/persistence/mongo-posts-repository';
import { Post, PostSchema } from 'src/posts/domain/post';
import { ImagesModule } from 'src/images/images.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Profile.name, schema: ProfileSchema },
      { name: Post.name, schema: PostSchema },
    ]),
    ImagesModule,
  ],
  providers: [
    ProfileService,
    { provide: 'ProfileRepository', useClass: MongoProfileRepository },
    { provide: 'PostsRepository', useClass: MongoPostsRepository },
  ],
  exports: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}

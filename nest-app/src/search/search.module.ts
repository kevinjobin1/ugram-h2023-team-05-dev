import { Module } from '@nestjs/common';
import { SearchController } from './api/search.controller';
import { SearchService } from './application/search.service';
import { MongoProfileRepository } from 'src/profile/infrastructure/persistence/profile.mongo.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from 'src/profile/domain/profile';
import { MongoPostsRepository } from 'src/posts/infrastructure/persistence/mongo-posts-repository';
import { Post, PostSchema } from 'src/posts/domain/post';

@Module({
  controllers: [SearchController],
  imports: [
    MongooseModule.forFeature([
      { name: Profile.name, schema: ProfileSchema },
      { name: Post.name, schema: PostSchema },
    ]),
  ],

  providers: [
    SearchService,
    { provide: 'ProfileRepository', useClass: MongoProfileRepository },
    { provide: 'PostsRepository', useClass: MongoPostsRepository },
  ],
})
export class SearchModule {}

import { Module } from '@nestjs/common';
import { PostsService } from './application/posts.service';
import { PostsController } from './api/posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './domain/post';
import { MongoPostsRepository } from './infrastructure/persistence/mongo-posts-repository';
import { NotificationsGateway } from 'src/notifications/api/notifications.gateway';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { ImagesService } from 'src/images/application/images.service';
import { ImagesModule } from 'src/images/images.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    NotificationsModule,
    ImagesModule,
  ],
  providers: [
    PostsService,
    {
      provide: 'PostsRepository',
      useClass: MongoPostsRepository,
    },
  ],
  controllers: [PostsController],
})
export class PostsModule {}

import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { NotificationsService } from 'src/notifications/application/notifications.service';
import { CommentNotification } from 'src/notifications/domain/comment-notification';
import { LikeNotification } from 'src/notifications/domain/like-notification';
import { CreateCommentRequest } from '../api/requests/create-comment-request';
import { CreatePostRequest } from '../api/requests/create-post-request';
import { UpdatePostRequest } from '../api/requests/update-post-request';
import { Comment } from '../domain/comment';
import { ForbiddenOperationException } from '../domain/exceptions/forbidden-operation-exception';
import { LikeNotFoundException } from '../domain/exceptions/like-not-found-exception';
import { PostAlreadyLikedException } from '../domain/exceptions/post-already-liked-exception';
import { Like } from '../domain/like';
import { PostsRepository } from '../domain/posts-repository';
import { extractMentions, extractTags } from '../domain/description-extractor';
import { ImagesService } from 'src/images/application/images.service';

@Injectable()
export class PostsService {
  constructor(
    @Inject('PostsRepository') private readonly postsRepository: PostsRepository,
    private readonly imagesService: ImagesService,
    private readonly notificationsService: NotificationsService,
  ) {}

  async create(
    userId: string,
    image: Express.Multer.File,
    { description }: CreatePostRequest,
  ) {
    const uploadedImage = await this.imagesService.uploadImage(userId, image);
    const id = randomUUID();
    const tags = extractTags(description);
    const mentions = extractMentions(description);
    return await this.postsRepository.create({
      id,
      userId,
      image: uploadedImage,
      description,
      mentions,
      tags,
      comments: [],
      likes: [],
      creationDate: new Date(),
    });
  }

  async update(userId: string, postId: string, { description }: UpdatePostRequest) {
    const post = await this.postsRepository.findById(postId);

    if (post.userId !== userId) {
      throw new ForbiddenOperationException();
    }

    const tags = extractTags(description);
    const mentions = extractMentions(description);
    post.description = description;
    post.tags = tags;
    post.mentions = mentions;

    await this.postsRepository.update(post);
  }

  async findById(id: string) {
    return await this.postsRepository.findById(id);
  }

  async commentPost(userId: string, postId: string, { text }: CreateCommentRequest) {
    const post = await this.postsRepository.findById(postId);

    const comment: Comment = {
      id: randomUUID(),
      postId,
      userId,
      text,
      createdAt: new Date(),
    };

    post.comments = [...post.comments, comment];
    await this.postsRepository.update(post);

    if (post.userId !== userId) {
      this.notificationsService.push(new CommentNotification(post.userId, comment));
    }

    return comment;
  }

  async likePost(userId: string, postId: string) {
    const post = await this.findById(postId);
    const isPostAlreadyLiked = post.likes.find((like) => like.userId === userId);

    if (isPostAlreadyLiked) {
      throw new PostAlreadyLikedException();
    }

    const like: Like = {
      id: randomUUID(),
      postId,
      userId,
      createdAt: new Date(),
    };

    post.likes = [...post.likes, like];
    await this.postsRepository.update(post);

    if (post.userId !== userId) {
      this.notificationsService.push(new LikeNotification(post.userId, like));
    }
  }

  async unlikePost(userId: string, postId: string) {
    const post = await this.findById(postId);
    const like = post.likes.find((l) => l.userId === userId);

    if (!like) {
      throw new LikeNotFoundException();
    }

    post.likes = post.likes.filter((l) => l.id !== like.id);
    await this.postsRepository.update(post);
  }

  async delete(userId: string, postId: string) {
    const post = await this.postsRepository.findById(postId);
    if (post.userId !== userId) {
      throw new ForbiddenOperationException();
    }
    await this.postsRepository.delete(post.id);
  }

  async getAllPosts() {
    return await this.postsRepository.findAll();
  }

  async getFilteredPosts(keyword: string) {
    if (!keyword) {
      return;
    }
    const HASHTAG_PREFIX = '%23';
    let posts = await this.getAllPosts();

    const filteredPosts = keyword.startsWith(HASHTAG_PREFIX)
      ? posts.filter((post) => post.tags.includes(keyword.replace(HASHTAG_PREFIX, '')))
      : posts.filter((post) =>
          post.description.toLowerCase().includes(keyword.toLowerCase()),
        );

    return filteredPosts;
  }

  async getComments(postId: string) {
    const post = await this.postsRepository.findById(postId);
    return post.comments;
  }

  async getCommentById(postId: string, commentId: string) {
    const post = await this.postsRepository.findById(postId);
    return post.comments.find((comment) => comment.id === commentId);
  }
}

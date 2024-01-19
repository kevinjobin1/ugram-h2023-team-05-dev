import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostNotFoundException } from 'src/posts/domain/exceptions/post-not-found-exception';
import { Post } from 'src/posts/domain/post';
import { PostsRepository } from 'src/posts/domain/posts-repository';

@Injectable()
export class MongoPostsRepository implements PostsRepository {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async create(post: Post): Promise<Post> {
    return await this.postModel.create(post);
  }

  async update(post: Post): Promise<void> {
    await this.postModel.updateOne({ id: post.id }, post).exec();
  }

  async findAll(): Promise<Post[]> {
    return await this.postModel
      .aggregate([
        {
          $lookup: {
            from: 'profiles',
            localField: 'userId',
            foreignField: 'userId',
            as: 'userProfiles',
          },
        },
        {
          $sort: { creationDate: -1 },
        },
        {
          $addFields: {
            profile: { $arrayElemAt: ['$userProfiles', 0] },
          },
        },
        {
          $lookup: {
            from: 'profiles',
            localField: 'likes.userId',
            foreignField: 'userId',
            as: 'likers',
          },
        },
        {
          $lookup: {
            from: 'profiles',
            localField: 'comments.userId',
            foreignField: 'userId',
            as: 'commenters',
          },
        },
        {
          $project: {
            _id: 0,
            id: 1,
            userId: 1,
            image: 1,
            description: 1,
            mentions: 1,
            tags: 1,
            comments: 1,
            likes: 1,
            likesCount: { $size: '$likers' },
            creationDate: 1,
            'profile.userId': 1,
            'profile.name': 1,
            'profile.username': 1,
            'profile.profilePicture': 1,
            'likers.userId': 1,
            'likers.name': 1,
            'likers.username': 1,
            'likers.profilePicture': 1,
            'commenters.userId': 1,
            'commenters.name': 1,
            'commenters.username': 1,
            'commenters.profilePicture': 1,
          },
        },
      ])
      .exec();
  }

  async findById(id: string): Promise<Post> {
    const posts = await this.postModel
      .aggregate([
        {
          $match: { id },
        },
        {
          $sort: { creationDate: -1 },
        },
        {
          $lookup: {
            from: 'profiles',
            localField: 'userId',
            foreignField: 'userId',
            as: 'userProfiles',
          },
        },
        {
          $addFields: {
            profile: { $arrayElemAt: ['$userProfiles', 0] },
          },
        },
        {
          $lookup: {
            from: 'profiles',
            localField: 'likes.userId',
            foreignField: 'userId',
            as: 'likers',
          },
        },
        {
          $lookup: {
            from: 'profiles',
            localField: 'comments.userId',
            foreignField: 'userId',
            as: 'commenters',
          },
        },
        {
          $project: {
            _id: 0,
            id: 1,
            userId: 1,
            image: 1,
            description: 1,
            mentions: 1,
            tags: 1,
            comments: 1,
            likes: 1,
            likesCount: { $size: '$likers' },
            creationDate: 1,
            'profile.userId': 1,
            'profile.name': 1,
            'profile.username': 1,
            'profile.profilePicture': 1,
            'likers.userId': 1,
            'likers.name': 1,
            'likers.username': 1,
            'likers.profilePicture': 1,
            'commenters.userId': 1,
            'commenters.name': 1,
            'commenters.username': 1,
            'commenters.profilePicture': 1,
          },
        },
      ])
      .exec();

    if (!posts[0]) {
      throw new PostNotFoundException();
    }
    return posts[0];
  }

  async findByUserId(userId: string): Promise<Post[]> {
    return await this.postModel
      .aggregate([
        {
          $match: { userId },
        },
        {
          $sort: { creationDate: -1 },
        },
        {
          $lookup: {
            from: 'profiles',
            localField: 'userId',
            foreignField: 'userId',
            as: 'userProfiles',
          },
        },
        {
          $addFields: {
            profile: { $arrayElemAt: ['$userProfiles', 0] },
          },
        },
        {
          $lookup: {
            from: 'profiles',
            localField: 'likes.userId',
            foreignField: 'userId',
            as: 'likers',
          },
        },
        {
          $lookup: {
            from: 'profiles',
            localField: 'comments.userId',
            foreignField: 'userId',
            as: 'commenters',
          },
        },
        {
          $project: {
            _id: 0,
            id: 1,
            userId: 1,
            image: 1,
            description: 1,
            mentions: 1,
            tags: 1,
            comments: 1,
            likes: 1,
            likesCount: { $size: '$likers' },
            creationDate: 1,
            'profile.userId': 1,
            'profile.name': 1,
            'profile.username': 1,
            'profile.profilePicture': 1,
            'likers.userId': 1,
            'likers.name': 1,
            'likers.username': 1,
            'likers.profilePicture': 1,
            'commenters.userId': 1,
            'commenters.name': 1,
            'commenters.username': 1,
            'commenters.profilePicture': 1,
          },
        },
      ])
      .exec();
  }

  async findByDescription(description: string, limit: number): Promise<Post[]> {
    return await this.postModel.aggregate([
      {
        $match: {
          description: { $regex: description, $options: 'i' },
        },
      },
      {
        $sort: { creationDate: -1 },
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: 'comments',
          localField: 'id',
          foreignField: 'postId',
          as: 'comments',
        },
      },
      {
        $lookup: {
          from: 'likes',
          localField: 'id',
          foreignField: 'postId',
          as: 'likes',
        },
      },
    ]);
  }

  async findByTag(tag: string, limit: number): Promise<Post[]> {
    return await this.postModel.aggregate([
      {
        $match: {
          tags: { $elemMatch: { $regex: tag, $options: 'i' } },
        },
      },
      {
        $sort: { creationDate: -1 },
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: 'comments',
          localField: 'id',
          foreignField: 'postId',
          as: 'comments',
        },
      },
      {
        $lookup: {
          from: 'likes',
          localField: 'id',
          foreignField: 'postId',
          as: 'likes',
        },
      },
    ]);
  }

  async delete(id: string): Promise<void> {
    await this.postModel.deleteOne({ id }).exec();
  }
}

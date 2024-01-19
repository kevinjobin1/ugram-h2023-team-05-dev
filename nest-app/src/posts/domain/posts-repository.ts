import { Post } from './post';

export interface PostsRepository {
  create(post: Post): Promise<Post>;
  update(post: Post): Promise<void>;
  findAll(): Promise<Post[]>;
  findById(id: string): Promise<Post>;
  findByUserId(userId: string): Promise<Post[]>;
  findByTag(tag: string, limit: number): Promise<Post[]>;
  findByDescription(description: string, limit: number): Promise<Post[]>;
  delete(id: string): Promise<void>;
}

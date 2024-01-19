import { Comment } from 'src/posts/domain/comment';
import { Like } from 'src/posts/domain/like';

export interface Notification {
  readonly userId: string;
  readonly type: string;
  readonly payload: Like | Comment;
}

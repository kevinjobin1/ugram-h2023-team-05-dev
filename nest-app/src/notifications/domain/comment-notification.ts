import { Comment } from 'src/posts/domain/comment';
import { Notification } from './notification';

export class CommentNotification implements Notification {
  readonly type: string = 'comment';
  readonly payload: Comment;

  constructor(readonly userId: string, readonly comment: Comment) {
    this.payload = comment;
  }
}

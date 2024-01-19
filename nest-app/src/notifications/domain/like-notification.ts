import { Like } from 'src/posts/domain/like';
import { Notification } from './notification';

export class LikeNotification implements Notification {
  readonly type: string = 'like';
  readonly payload: Like;

  constructor(readonly userId: string, readonly like: Like) {
    this.payload = like;
  }
}

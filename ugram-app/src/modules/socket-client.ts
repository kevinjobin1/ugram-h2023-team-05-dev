import { io, Socket } from 'socket.io-client';

import { Comment, Like } from '../types/Post';

const API_URL = import.meta.env.VITE_API_URL;

export type NotificationsCallbacks = {
  onLikeReceived: (like: Like) => Promise<void>;
  onCommentReceived: (comment: Comment) => Promise<void>;
};

export class SocketClient {
  private static readonly SERVER_ORIGIN = API_URL;
  private readonly socket: Socket = {} as Socket;

  constructor({ onLikeReceived, onCommentReceived }: NotificationsCallbacks) {
    this.socket = io(SocketClient.SERVER_ORIGIN, {
      withCredentials: true,
    });

    this.socket.on('like', async (like) => {
      await onLikeReceived(like);
    });

    this.socket.on('comment', async (comment) => {
      await onCommentReceived(comment);
    });
  }

  disconnect() {
    this.socket?.disconnect();
  }
}

import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Notification } from '../domain/notification';
import { AuthService } from 'src/auth/application/auth.service';
import { parse } from 'cookie';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
@Injectable()
export class NotificationsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  private readonly server: Socket;
  private readonly clients: Record<string, string> = {};

  constructor(
    private readonly authService: AuthService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
  ) {}

  afterInit(server: Server) {
    this.logger.log('NotificationsGateway initialized.', NotificationsGateway.name);
  }

  async handleConnection(socket: Socket) {
    this.logger.log('Client connected: ' + socket.id, NotificationsGateway.name);
    const userId = await this.getUserIdFromTokenCookie(socket.handshake.headers.cookie);
    const clientId = socket.id;
    this.clients[userId] = clientId;
  }

  async handleDisconnect(socket: Socket) {
    this.logger.log('Client disconnected: ' + socket.id, NotificationsGateway.name);
    const userId = await this.getUserIdFromTokenCookie(socket.handshake.headers.cookie);
    delete this.clients[userId];
  }

  async sendNotification({ userId, type, payload }: Notification) {
    this.logger.log(
      'Sending notification to userId: ' + userId + '.',
      NotificationsGateway.name,
    );
    const clientId = this.clients[userId];
    if (clientId) {
      this.server.to(clientId).emit(type, payload);
    }
  }

  private async getUserIdFromTokenCookie(cookieHeader: string) {
    const cookies = parse(cookieHeader || '');
    const token = cookies['token'];
    return await this.authService.findUserIdFromToken(token);
  }
}

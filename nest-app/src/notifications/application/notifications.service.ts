import { Injectable } from '@nestjs/common';
import { NotificationsGateway } from '../api/notifications.gateway';
import { Notification } from '../domain/notification';

@Injectable()
export class NotificationsService {
  private readonly notificationsQueue: Notification[] = [];
  private isProcessing: boolean = false;

  constructor(private readonly notificationsGateway: NotificationsGateway) {}

  public push(notification: Notification) {
    this.notificationsQueue.push(notification);
    if (!this.isProcessing) {
      this.processNotifications();
    }
  }

  private async processNotifications() {
    this.isProcessing = true;
    while (this.notificationsQueue.length > 0) {
      const notification = this.notificationsQueue.shift();
      await this.notificationsGateway.sendNotification(notification);
    }
    this.isProcessing = false;
  }
}

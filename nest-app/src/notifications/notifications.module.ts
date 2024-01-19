import { Module } from '@nestjs/common';
import { NotificationsService } from './application/notifications.service';
import { NotificationsGateway } from './api/notifications.gateway';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [NotificationsService, NotificationsGateway],
  exports: [NotificationsService],
})
export class NotificationsModule {}

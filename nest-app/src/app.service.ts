import { Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getHealth(): string {
    this.logger.log('Health status: OK');
    return 'Health status: OK';
  }
}

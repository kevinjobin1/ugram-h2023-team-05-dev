import { Module } from '@nestjs/common';
import { ImagesController } from './api/images.controller';
import { ImagesService } from './application/images.service';
import { AmazonS3ImagesHostingService } from './infrastructure/external-services/amazon-s3-images-hosting-service';

@Module({
  controllers: [ImagesController],
  providers: [
    ImagesService,
    { provide: 'ImagesHostingService', useClass: AmazonS3ImagesHostingService },
  ],
  exports: [ImagesService],
})
export class ImagesModule {}

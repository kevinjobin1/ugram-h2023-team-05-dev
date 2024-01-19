import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ImagesHostingService } from '../domain/images-hosting-service';
import * as sharp from 'sharp';
import { Image } from '../domain/image';
import { SingleSizeImage } from '../domain/single-size-image';

const FULL_WIDTH = 1200;
const MEDIUM_WIDTH = 900;
const SMALL_WIDTH = 600;

@Injectable()
export class ImagesService {
  constructor(
    @Inject('ImagesHostingService')
    private readonly imagesHostingService: ImagesHostingService,
  ) {}

  async uploadProfilePicture(
    userId: string,
    image: Express.Multer.File,
  ): Promise<SingleSizeImage> {
    return await this.uploadResizedImage(userId, image, SMALL_WIDTH);
  }

  async uploadImage(userId: string, image: Express.Multer.File): Promise<Image> {
    const fullImage = await this.uploadResizedImage(userId, image, FULL_WIDTH);
    const mediumImage = await this.uploadResizedImage(userId, image, MEDIUM_WIDTH);
    const smallImage = await this.uploadResizedImage(userId, image, SMALL_WIDTH);
    return {
      full: fullImage,
      medium: mediumImage,
      small: smallImage,
    };
  }

  private async uploadResizedImage(
    userId: string,
    image: Express.Multer.File,
    width: number,
  ) {
    const imageId = randomUUID();
    const key = `profiles/${userId}/images/${imageId}`;
    const buffer = await sharp(image.buffer).resize({ width }).toBuffer();
    const contentType = image.mimetype || 'image/jpeg';
    const imageUrl = await this.imagesHostingService.upload(key, buffer, contentType);
    return {
      id: imageId,
      url: imageUrl,
    };
  }
}

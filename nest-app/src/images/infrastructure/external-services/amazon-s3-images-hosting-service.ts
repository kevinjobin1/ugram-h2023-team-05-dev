import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { UnavailableServiceException } from 'src/images/domain/exceptions/unavailable-service-exception';
import { ImagesHostingService } from '../../domain/images-hosting-service';

@Injectable()
export class AmazonS3ImagesHostingService implements ImagesHostingService {
  private readonly s3: S3Client;
  private readonly bucket: string;

  constructor() {
    this.s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    this.bucket = process.env.AWS_S3_BUCKET;
  }

  async upload(key: string, buffer: Buffer, contentType: string): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    });

    try {
      await this.s3.send(command);
    } catch (error) {
      throw new UnavailableServiceException(error.message);
    }

    return `https://d2hvphhf40yv33.cloudfront.net/${key}`;
  }
}

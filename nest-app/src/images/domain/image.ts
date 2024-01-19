import { ApiProperty } from '@nestjs/swagger';
import { SingleSizeImage } from './single-size-image';

export class Image {
  @ApiProperty({
    description: 'The full size image',
  })
  readonly full: SingleSizeImage;

  @ApiProperty({
    description: 'The medium size image',
  })
  readonly medium: SingleSizeImage;

  @ApiProperty({
    description: 'The small size image',
  })
  readonly small: SingleSizeImage;
}

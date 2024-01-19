import { ApiProperty } from '@nestjs/swagger';

export class SingleSizeImage {
  @ApiProperty({
    example: '933e1ae1-c26a-4008-b0a1-e3cdb7d4fa11',
    description: 'The id of the image.',
  })
  readonly id: string;

  @ApiProperty({
    example: 'https://.../image',
    description: 'The url of the image.',
  })
  readonly url: string;
}

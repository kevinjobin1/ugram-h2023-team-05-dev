import { ApiProperty } from '@nestjs/swagger';

export class Comment {
  @ApiProperty({
    example: '933e1ae1-c26a-4008-b0a1-e3cdb7d4fa11',
    description: 'The id of the comment.',
  })
  readonly id: string;
  @ApiProperty({
    example: '933e1ae1-c26a-4008-b0a1-e3cdb7d4fa11',
    description: 'The id of the post.',
  })
  readonly postId: string;
  @ApiProperty({
    example: '933e1ae1-c26a-4008-b0a1-e3cdb7d4fa11',
    description: 'The id of the user.',
  })
  readonly userId: string;
  @ApiProperty({
    example: 'lol',
    description: 'The text of the comment.',
  })
  readonly text: string;
  @ApiProperty({
    description: 'The creation date of the comment.',
  })
  readonly createdAt: Date;
}

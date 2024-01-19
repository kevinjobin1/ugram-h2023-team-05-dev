import { Like } from 'src/posts/domain/like';
import { Post } from 'src/posts/domain/post';
import { Image } from 'src/images/domain/image';
import { Comment } from 'src/posts/domain/comment';
import { ApiProperty } from '@nestjs/swagger';

export class PostResponse implements Post {
  @ApiProperty({
    example: '933e1ae1-c26a-4008-b0a1-e3cdb7d4fa11',
    description: 'The id of the post.',
  })
  id: string;
  @ApiProperty({
    example: '933e1ae1-c26a-4008-b0a1-e3cdb7d4fa11',
    description: 'The user id of the post.',
  })
  userId: string;

  @ApiProperty({
    description: 'The image of the post.',
    type: Image,
  })
  image: Image;

  @ApiProperty({
    example: 'Hello',
    description: 'The description of the post.',
  })
  description: string;

  @ApiProperty({
    example: ['lol', 'wtf'],
    description: 'The mentions of the post.',
  })
  mentions: string[];

  @ApiProperty({
    example: ['lol', 'wtf'],
    description: 'The tags of the post.',
  })
  tags: string[];

  @ApiProperty({
    description: 'The comments of the post.',
    type: Comment,
    isArray: true,
  })
  comments: Comment[];

  @ApiProperty({
    description: 'The likes of the post.',
    type: Like,
    isArray: true,
  })
  likes: Like[];

  @ApiProperty({
    description: 'The creation date of the post.',
  })
  creationDate: Date;
}

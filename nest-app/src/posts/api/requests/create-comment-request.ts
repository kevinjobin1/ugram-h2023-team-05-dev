import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCommentRequest {
  @IsNotEmpty()
  @ApiProperty({
    example: 'Shitty dog',
    description: 'The text of the comment.',
  })
  text: string;
}

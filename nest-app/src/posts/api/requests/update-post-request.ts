import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostRequest {
  @ApiProperty({
    example: 'My new dog',
    description: 'The description of the post.',
  })
  readonly description: string;
}

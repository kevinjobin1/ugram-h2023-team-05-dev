import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentResponse {
  @ApiProperty({
    example: '933e1ae1-c26a-4008-b0a1-e3cdb7d4fa11',
    description: 'The id of the created comment.',
  })
  readonly id: string;

  constructor(id: string) {
    this.id = id;
  }
}

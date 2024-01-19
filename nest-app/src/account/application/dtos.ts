import { ApiProperty } from '@nestjs/swagger';
import { Account } from '../domain/account';

export class AccountDto implements Omit<Account, 'password' | 'googleId'> {
  @ApiProperty({
    description: 'The id of the user (UUID v4)',
    example: '42a1599a-d208-4819-adee-17591edaa28d',
  })
  userId: string;

  @ApiProperty({
    description: 'The full name of the user',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'The username of the user',
    example: 'johndoe',
  })
  username?: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@ugram.link',
  })
  email: string;

  @ApiProperty({
    description: 'The phone number of the user',
    example: '+14188081234',
  })
  phoneNumber?: string;

  @ApiProperty({
    description: 'The creation date of the user',
    example: '2020-10-29T20:00:00.000Z',
  })
  creationDate: Date;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsStrongPassword } from 'class-validator';

export class AccountCreationRequest {
  @ApiProperty({
    description: 'The full name of the user. Cannot be empty.',
    example: 'John Doe',
  })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    description: 'The username of the user. Cannot be empty.',
    example: 'johndoe',
  })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({
    description:
      'The email of the user. Has to match a regular expression : /^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$/',
    example: 'john.doe@ugram.link',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description:
      'The phone number of the user. Has to match a regular expression : /^\\+1[0-9]{10}$/',
    example: '+14188081234',
  })
  @IsPhoneNumber('CA')
  readonly phoneNumber: string;

  @ApiProperty({
    description:
      'The password of the user. Has to be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character.',
    example: 'P@sSw0rd123',
  })
  @IsStrongPassword()
  readonly password: string;
}

export class AccountEditionRequest
  implements Omit<AccountCreationRequest, 'username' | 'password'>
{
  @ApiProperty({
    description: 'The full name of the user. Cannot be empty.',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description:
      'The email of the user. Has to match a regular expression : /^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$/',
    example: 'john.doe@ugram.link',
  })
  email: string;

  @ApiProperty({
    description:
      'The phone number of the user. Has to match a regular expression : /^\\+1[0-9]{10}$/',
    example: '+14188081234',
  })
  phoneNumber: string;
}

export class AccountSignInRequest
  implements Pick<AccountCreationRequest, 'email' | 'password'>
{
  @ApiProperty({
    description: 'The email of the user. Cannot be empty.',
    example: 'john.doe@ugram.link',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: 'The password of the user. Cannot be empty.',
    example: 'P@sSw0rd123',
  })
  @IsStrongPassword()
  readonly password: string;
}

import { IsEmail, IsNotEmpty, IsPhoneNumber, IsStrongPassword } from 'class-validator';

export class ProfileCreationRequest {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly username: string;

  @IsEmail()
  readonly email: string;

  @IsPhoneNumber('CA')
  readonly phoneNumber: string;

  @IsStrongPassword()
  readonly password: string;
}

export class ProfileEditionRequest {
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsPhoneNumber('CA')
  readonly phoneNumber: string;
}

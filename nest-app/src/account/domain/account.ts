import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type AccountDocument = HydratedDocument<Account>;

@Schema()
export class Account {
  @ApiProperty({
    description: 'The id of the user (UUID v4)',
    example: '42a1599a-d208-4819-adee-17591edaa28d',
  })
  @Prop()
  readonly userId: string;

  @ApiProperty({
    description: 'The google id of the user',
    example: '42a1599a-d208-4819-adee-17591edaa28d',
  })
  @Prop()
  readonly googleId?: string;

  @ApiProperty({
    description: 'The full name of the user',
    example: 'John Doe',
  })
  @Prop()
  name: string;

  @ApiProperty({
    description: 'The username of the user',
    example: 'johndoe',
  })
  @Prop()
  readonly username?: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@ugram.link',
  })
  @Prop()
  email: string;

  @ApiProperty({
    description: 'The phone number of the user',
    example: '+14188081234',
  })
  @Prop()
  phoneNumber?: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'P@sSw0rd123',
  })
  @Prop()
  readonly password?: string;

  @ApiProperty({
    description: 'The creation date of the user',
    example: '2020-10-29T20:00:00.000Z',
  })
  @Prop()
  readonly creationDate: Date;
}

export const AccountSchema = SchemaFactory.createForClass(Account);

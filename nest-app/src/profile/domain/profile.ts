import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { PostResponse } from 'src/posts/api/responses/post-response';
import { Post } from 'src/posts/domain/post';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema()
export class Profile {
  @Prop()
  @ApiProperty({
    description: 'The id of the profile',
    example: '42a1599a-d208-4819-adee-17591edaa28d',
  })
  readonly userId: string;

  @Prop()
  @ApiProperty({
    description: 'The name of the profile',
    example: 'Etienne',
  })
  name: string;

  @Prop()
  @ApiProperty({
    description: 'The username of the profile',
    example: 'et_marcoux',
  })
  readonly username: string;

  @Prop()
  @ApiProperty({
    description: 'The posts of the profile',
    type: PostResponse,
    isArray: true,
  })
  posts: Post[];

  @Prop()
  @ApiProperty({
    description: 'The profile picture of the profile',
    example: 'https://.../image',
  })
  profilePicture: string;

  @Prop()
  @ApiProperty({
    description: 'The pictures count of the profile',
    example: 3,
  })
  readonly picturesCount: number;

  @Prop()
  @ApiProperty({
    description: 'The followers count of the profile',
    example: 3,
  })
  readonly followersCount: number;

  @Prop()
  @ApiProperty({
    description: 'The subscribers count of the profile',
    example: 3,
  })
  readonly subscribersCount: number;

  @Prop()
  @ApiProperty({
    description: 'The description of the profile',
    example: 'Hello I am a geek',
  })
  readonly description: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);

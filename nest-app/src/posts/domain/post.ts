import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Image } from 'src/images/domain/image';
import { Comment } from './comment';
import { Like } from './like';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop()
  readonly id: string;

  @Prop()
  readonly userId: string;

  @Prop()
  readonly image: Image;

  @Prop()
  description: string;

  @Prop()
  mentions: string[];

  @Prop()
  tags: string[];

  @Prop()
  comments: Comment[];

  @Prop()
  likes: Like[];

  @Prop()
  readonly creationDate: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);

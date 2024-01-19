import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { PostAlreadyLikedException } from 'src/posts/domain/exceptions/post-already-liked-exception';

@Catch(PostAlreadyLikedException)
export class PostAlreadyLikedExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.CONFLICT).json({
      statusCode: HttpStatus.CONFLICT,
      message: 'You already have liked this post.',
    });
  }
}

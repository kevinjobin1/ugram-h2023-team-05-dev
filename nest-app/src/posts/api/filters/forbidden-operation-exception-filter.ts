import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ForbiddenOperationException } from 'src/posts/domain/exceptions/forbidden-operation-exception';

@Catch(ForbiddenOperationException)
export class ForbiddenOperationExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.FORBIDDEN).json({
      statusCode: HttpStatus.FORBIDDEN,
      message: 'You are not allowed to perform this operation on this publication.',
    });
  }
}

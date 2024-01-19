import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UnavailableServiceException } from 'src/images/domain/exceptions/unavailable-service-exception';

@Catch(UnavailableServiceException)
export class UnavailableServiceExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.SERVICE_UNAVAILABLE).json({
      statusCode: HttpStatus.SERVICE_UNAVAILABLE,
      message:
        'An external service required to perform this action is currently unavailable',
    });
  }
}

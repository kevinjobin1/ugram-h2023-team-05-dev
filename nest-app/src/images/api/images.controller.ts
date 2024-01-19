import {
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { Account } from 'src/account/domain/account';
import { JwtAuthGuard } from 'src/auth/api/guards/jwt-auth.guard';
import { ImagesService } from '../application/images.service';
import { UnavailableServiceExceptionFilter } from './filters/unavailable-service-exception-filter';
import {
  ApiBody,
  ApiConsumes,
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiServiceUnavailableResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Image } from '../domain/image';

@UseFilters(new UnavailableServiceExceptionFilter())
@Controller('images')
@ApiTags('Images')
export class ImagesController {
  constructor(private readonly imageUploadService: ImagesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        description: { type: 'string' },
        image: {
          type: 'image/png',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Upload an image' })
  @ApiOkResponse({
    description: 'The image has been uploaded',
    type: Image,
  })
  @ApiCookieAuth()
  @ApiServiceUnavailableResponse({ description: 'There was an error uploading the file' })
  @UseInterceptors(FilesInterceptor('images'))
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async uploadImages(
    @Req() request: Request,
    @UploadedFile() image: Express.Multer.File,
    @Res() response: Response,
  ) {
    const account = request.user as Account;
    const uploadedImage = await this.imageUploadService.uploadImage(
      account.userId,
      image,
    );
    return response.status(HttpStatus.OK).json(uploadedImage);
  }
}

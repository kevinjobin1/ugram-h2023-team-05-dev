import {
  Controller,
  Get,
  Inject,
  LoggerService,
  Param,
  Patch,
  Req,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ProfileService } from '../application/profile.service';
import {
  ProfileNotFoundExceptionFilter,
  UnauthorizedProfileExceptionFilter,
} from './filters';
import {
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/api/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Account } from 'src/account/domain/account';
import { Request } from 'express';
import { UnauthorizedProfileException } from '../domain/exceptions';
import { Profile } from '../domain/profile';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
  ) {}

  @Get()
  @ApiOkResponse({
    description: 'The profiles have been returned',
    type: Profile,
    isArray: true,
  })
  @ApiOperation({ summary: 'Get all user profiles' })
  async getProfiles() {
    this.logger.log('Get profiles request.', ProfileController.name);
    return await this.profileService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user profile by id' })
  @ApiOkResponse({ description: 'The profile has been returned', type: Profile })
  @ApiNotFoundResponse({ description: 'The profile has not been found' })
  @UseFilters(ProfileNotFoundExceptionFilter)
  @ApiParam({
    name: 'id',
    description: 'Profile id',
    example: '933e1ae1-c26a-4008-b0a1-e3cdb7d4fa11',
  })
  async getProfileById(@Param('id') id: string) {
    this.logger.log(
      'Get profile request for userId: ' + id + '.',
      ProfileController.name,
    );
    return await this.profileService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  @UseFilters(ProfileNotFoundExceptionFilter)
  @UseFilters(UnauthorizedProfileExceptionFilter)
  @ApiOperation({ summary: 'Change profile picture' })
  @ApiOkResponse({ description: 'The profile picture has been updated' })
  @ApiNotFoundResponse({ description: 'The profile has not been found' })
  @ApiParam({
    name: 'id',
    description: 'Profile id',
    example: '933e1ae1-c26a-4008-b0a1-e3cdb7d4fa11',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async changeProfilePicture(
    @Param('id') id: string,
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    this.logger.log(
      'Changing profile picture for userId: ' + id + '.',
      ProfileController.name,
    );
    const image = file.buffer;
    this.logger.log(
      'Image size: ' + image.byteLength + ' bytes.',
      ProfileController.name,
    );

    const account = req.user as Account;
    if (id != account.userId) throw new UnauthorizedProfileException();
    return await this.profileService.updateProfilePicture(id, file);
  }
}

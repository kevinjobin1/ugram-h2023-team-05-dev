import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  LoggerService,
  Post,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { CookieOptions, Request, Response } from 'express';
import { Account } from 'src/account/domain/account';
import { AuthService } from '../application/auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { InvalidEmailOrPasswordExceptionFilter } from './filters';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCookieAuth,
  ApiOAuth2,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AccountSignInRequest } from 'src/account/api/dtos';
import { EmailAlreadyTakenExceptionFilter } from 'src/account/api/filters';

@ApiTags('Auth')
@Controller('auth')
@UseFilters(EmailAlreadyTakenExceptionFilter)
export class AuthController {
  public static readonly TOKEN_COOKIE_NAME = 'token';
  private static readonly COOKIE_OPTIONS: CookieOptions = {
    secure: true,
    httpOnly: true,
    sameSite: 'none',
  };

  constructor(
    private readonly authService: AuthService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  @ApiBody({ type: AccountSignInRequest })
  @ApiOperation({ summary: 'Sign in with email and password' })
  @ApiOkResponse({ description: 'The user has been signed in' })
  @ApiBadRequestResponse({
    description: 'Invalid email or password',
  })
  @UseFilters(InvalidEmailOrPasswordExceptionFilter)
  async signIn(@Req() request: Request, @Res() response: Response) {
    const user = request.user as Account;
    this.logger.log(
      'Signin request for userId: ' + user.userId + '.',
      AuthController.name,
    );
    const token = await this.authService.signIn(user);
    this.logger.log(
      'Successful signin. New token generated: ' + token,
      AuthController.name,
    );
    return response
      .cookie(AuthController.TOKEN_COOKIE_NAME, token, AuthController.COOKIE_OPTIONS)
      .status(HttpStatus.OK)
      .json({ status: HttpStatus.OK, message: 'Signed in successfully.' });
  }

  @UseGuards(GoogleAuthGuard)
  @ApiOAuth2(['email', 'profile'])
  @Get('google')
  @ApiOperation({ summary: 'Sign in with Google OAuth' })
  @ApiOkResponse({ description: 'The user has been signed in with google' })
  async signInWithGoogle(@Req() request: Request) {}

  @UseGuards(GoogleAuthGuard)
  @ApiOAuth2(['email', 'profile'])
  @Get('google/redirect')
  @ApiOperation({ summary: 'Redirect after Google OAuth' })
  @ApiOkResponse({ description: 'The user has been redirected to home page' })
  async googleRedirect(@Req() request: Request, @Res() response: Response) {
    const token = await this.authService.signIn(request.user as Account);
    return response
      .cookie(AuthController.TOKEN_COOKIE_NAME, token, AuthController.COOKIE_OPTIONS)
      .status(HttpStatus.OK)
      .redirect(process.env.CLIENT_ORIGIN);
  }

  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  @Post('/signout')
  @ApiOkResponse({ description: 'The user has been signed out' })
  @ApiOperation({ summary: 'Sign out from the application' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async signOut(@Res() response: Response) {
    return response
      .clearCookie(AuthController.TOKEN_COOKIE_NAME)
      .status(HttpStatus.OK)
      .json({ status: HttpStatus.OK, message: 'Signed out.' });
  }
}

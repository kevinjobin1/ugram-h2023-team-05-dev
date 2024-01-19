import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  Post,
  Req,
  Res,
  Delete,
  UseFilters,
  UseGuards,
  Inject,
  LoggerService,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '../../auth/api/guards/jwt-auth.guard';
import { AccountService } from '../application/account.service';
import { AccountDto } from '../application/dtos';
import { AccountCreationRequest, AccountEditionRequest } from './dtos';
import {
  AccountNotFoundExceptionFilter,
  EmailAlreadyTakenExceptionFilter,
} from './filters';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AccountDtoAssembler } from './account-dto-assembler';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Account } from '../domain/account';

/**
 * Account controller
 * @class
 * @public
 * @description This class is the controller for the account entity. It is used to create, edit, get and delete accounts.
 * @memberof AccountModule
 * @name AccountController
 * @version 1.0.0
 * @see AccountService
 * @see Account
 * @see AccountNotFoundExceptionFilter
 * @see EmailAlreadyTakenExceptionFilter
 * @see AccountCreationRequest
 * @see AccountEditionRequest
 */

@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly accountDtoAssembler: AccountDtoAssembler,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
  ) {}

  @Post('/signup')
  @ApiOperation({ summary: 'Create a new account' })
  @UseFilters(EmailAlreadyTakenExceptionFilter)
  @ApiCreatedResponse({
    description: 'The account has been successfully created.',
    type: AccountDto,
  })
  @ApiBadRequestResponse({
    description: 'Email has already been taken or invalid request',
  })
  @ApiBody({ type: AccountCreationRequest })
  async create(@Body() accountCreationRequest: AccountCreationRequest): Promise<Account> {
    this.logger.log(
      'Create account request for username: ' + accountCreationRequest.username + '.',
      AccountController.name,
    );
    return await this.accountService.create(
      accountCreationRequest.name,
      accountCreationRequest.email,
      accountCreationRequest.username,
      accountCreationRequest.phoneNumber,
      accountCreationRequest.password,
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  @Get()
  @ApiOperation({ summary: 'Get the account of the logged user' })
  @ApiOkResponse({ description: 'The account has been returned', type: AccountDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getAccount(@Req() request: Request, @Res() response: Response) {
    const account = request.user as Account;
    const accountResponse = this.accountDtoAssembler.toResponse(account);
    return response.status(HttpStatus.OK).json(accountResponse);
  }

  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  @Patch()
  @ApiOperation({ summary: 'Edit the account of the logged user' })
  @ApiOkResponse({ description: 'The account has been edited' })
  @ApiBadRequestResponse({
    description: 'Invalid request',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseFilters(AccountNotFoundExceptionFilter)
  async editAccount(
    @Req() req: Request,
    @Body() accountEditionRequest: AccountEditionRequest,
  ) {
    const account = req.user as Account;
    this.logger.log(
      'Edit account request for userId: ' + account.userId + '.',
      AccountController.name,
    );
    await this.accountService.updateAccount(
      account.userId,
      accountEditionRequest.name,
      accountEditionRequest.email,
      accountEditionRequest.phoneNumber,
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiCookieAuth()
  @ApiOkResponse({ description: 'The account has been deleted' })
  @Delete()
  @ApiOperation({ summary: 'Delete the account of the logged user' })
  async deleteAccount(@Req() req: Request) {
    const account = req.user as Account;
    this.logger.log(
      'Delete account request for userId: ' + account.userId + '.',
      AccountController.name,
    );
    await this.accountService.deleteAccount(account.userId);
  }
}

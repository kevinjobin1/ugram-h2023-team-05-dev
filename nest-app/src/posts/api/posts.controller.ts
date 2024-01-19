import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  LoggerService,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Express, Request, Response } from 'express';
import { Account } from 'src/account/domain/account';
import { JwtAuthGuard } from 'src/auth/api/guards/jwt-auth.guard';
import { PostsService } from '../application/posts.service';
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateCommentRequest } from './requests/create-comment-request';
import { PostAlreadyLikedExceptionFilter } from './filters/post-already-liked-exception-filter';
import { ForbiddenOperationExceptionFilter } from './filters/forbidden-operation-exception-filter';
import { CreatePostRequest } from './requests/create-post-request';
import { UpdatePostRequest } from './requests/update-post-request';
import { PostNotFoundExceptionFilter } from './filters/post-not-found-exception-filter';
import { LikeNotFoundExceptionFilter } from './filters/like-not-found-exception-filter';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetPostsFilterDto } from './requests/posts-filter-dto';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { PostResponse } from './responses/post-response';
import { CreatePostResponse } from './responses/create-post-response';
import { CreateCommentResponse } from './responses/create-comment-response';
import { Comment } from '../domain/comment';

@UseFilters(
  new PostNotFoundExceptionFilter(),
  new ForbiddenOperationExceptionFilter(),
  new PostAlreadyLikedExceptionFilter(),
  new LikeNotFoundExceptionFilter(),
)
@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiOkResponse({
    description: 'The posts have been returned',
    type: PostResponse,
    isArray: true,
  })
  async getAllPosts(@Query() filterDto: GetPostsFilterDto) {
    if (Object.keys(filterDto).length) {
      return await this.postsService.getFilteredPosts(filterDto.search);
    }
    return await this.postsService.getAllPosts();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'The specified post has been returned',
    type: PostResponse,
  })
  @ApiParam({
    name: 'id',
    description: 'Post id',
    example: '933e1ae1-c26a-4008-b0a1-e3cdb7d4fa11',
  })
  @ApiOperation({ summary: 'Get a post by id' })
  @ApiNotFoundResponse({ description: 'The post has not been found' })
  async findById(@Param('id') postId: string, @Res() res: Response) {
    const post = await this.postsService.findById(postId);
    return res.json(post);
  }

  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @ApiCreatedResponse({
    description: 'The post has been created',
    type: CreatePostResponse,
  })
  @Post()
  @ApiOperation({ summary: 'Create a post' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async create(
    @Req() req: Request,
    @UploadedFile() image: Express.Multer.File,
    @Body() createPostRequest: CreatePostRequest,
    @Res() res: Response,
  ) {
    const account = req.user as Account;

    this.logger.log('Creating a post from user: ' + account.userId + '.');

    const { id } = await this.postsService.create(
      account.userId,
      image,
      createPostRequest,
    );
    return res
      .status(HttpStatus.CREATED)
      .setHeader('Location', `/posts/${id}`)
      .json(new CreatePostResponse(id));
  }

  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a post' })
  @ApiOkResponse({
    description: 'The specified post has been updated',
  })
  @ApiParam({
    name: 'id',
    description: 'Post id',
    example: '933e1ae1-c26a-4008-b0a1-e3cdb7d4fa11',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'The post has not been found' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async update(
    @Param('id') postId: string,
    @Req() req: Request,
    @Body() updatePostRequest: UpdatePostRequest,
    @Res() res: Response,
  ) {
    const account = req.user as Account;
    await this.postsService.update(account.userId, postId, updatePostRequest);
    return res.status(HttpStatus.NO_CONTENT).send();
  }

  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':id/comments')
  @ApiOperation({ summary: 'Create a comment' })
  @ApiCreatedResponse({ description: 'Comment created', type: CreateCommentResponse })
  @ApiBadRequestResponse({ description: 'Invalid request' })
  @ApiNotFoundResponse({ description: 'The post has not been found' })
  @ApiParam({
    name: 'id',
    description: 'Post id',
    example: '933e1ae1-c26a-4008-b0a1-e3cdb7d4fa11',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async createComment(
    @Param('id') postId: string,
    @Req() req: Request,
    @Body() createCommentRequest: CreateCommentRequest,
    @Res() res: Response,
  ) {
    const account = req.user as Account;
    const { id } = await this.postsService.commentPost(
      account.userId,
      postId,
      createCommentRequest,
    );
    return res
      .status(HttpStatus.CREATED)
      .setHeader('Location', `comments/${id}`)
      .json(new CreateCommentResponse(id));
  }

  @Get(':id/comments')
  @ApiOperation({ summary: 'Get all comments' })
  @ApiOkResponse({
    description: 'The comments have been returned',
    type: Comment,
    isArray: true,
  })
  @ApiNotFoundResponse({ description: 'The post has not been found' })
  @ApiParam({
    name: 'id',
    description: 'Post id',
    example: '933e1ae1-c26a-4008-b0a1-e3cdb7d4fa11',
  })
  async getComments(@Param('id') postId: string, @Res() res: Response) {
    const comments = await this.postsService.getComments(postId);
    return res.status(HttpStatus.OK).json(comments);
  }

  @Get(':id/comments/:commentId')
  @ApiOperation({ summary: 'Get a comment' })
  @ApiOkResponse({ description: 'The comment has been returned', type: Comment })
  @ApiNotFoundResponse({ description: 'The post or comment has not been found' })
  @ApiParam({
    name: 'id',
    description: 'Post id',
    example: '933e1ae1-c26a-4008-b0a1-e3cdb7d4fa11',
  })
  @ApiParam({
    name: 'commentId',
    description: 'Comment id',
    example: '933e1ae1-c26a-4008-b0a1-e3cdb7d4fa11',
  })
  async getCommentById(
    @Param('id') postId: string,
    @Param('commentId') commentId: string,
    @Res() res: Response,
  ) {
    const comment = await this.postsService.getCommentById(postId, commentId);
    return res.status(HttpStatus.OK).json(comment);
  }

  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':id/like')
  @ApiParam({
    name: 'id',
    description: 'Post id',
    example: '933e1ae1-c26a-4008-b0a1-e3cdb7d4fa11',
  })
  @ApiOperation({ summary: 'Like a post' })
  @ApiNoContentResponse({ description: 'The post has been liked' })
  @ApiNotFoundResponse({ description: 'The post has not been found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async likePost(@Param('id') postId: string, @Req() req: Request, @Res() res: Response) {
    const account = req.user as Account;
    await this.postsService.likePost(account.userId, postId);
    return res.status(HttpStatus.NO_CONTENT).send();
  }

  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':id/unlike')
  @ApiParam({
    name: 'id',
    description: 'Post id',
    example: '933e1ae1-c26a-4008-b0a1-e3cdb7d4fa11',
  })
  @ApiNoContentResponse({ description: 'The post has been unliked' })
  @ApiOperation({ summary: 'Unlike a post' })
  @ApiNotFoundResponse({ description: 'The post has not been found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async unlikePost(
    @Param('id') postId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const account = req.user as Account;
    await this.postsService.unlikePost(account.userId, postId);
    return res.status(HttpStatus.NO_CONTENT).send();
  }

  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'Post id',
    example: '933e1ae1-c26a-4008-b0a1-e3cdb7d4fa11',
  })
  @ApiOperation({ summary: 'Delete a post' })
  @ApiNoContentResponse({ description: 'The post has been deleted' })
  @ApiNotFoundResponse({ description: 'The post has not been found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async delete(@Param('id') postId: string, @Req() req: Request, @Res() res: Response) {
    const account = req.user as Account;
    await this.postsService.delete(account.userId, postId);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}

import { Controller, Get, Query, LoggerService, Inject } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { SearchService } from '../application/search.service';
import { Profile } from 'src/profile/domain/profile';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Post } from 'src/posts/domain/post';
import { PostResponse } from 'src/posts/api/responses/post-response';

@ApiTags('Search')
@Controller('search')
export class SearchController {
  constructor(
    private readonly searchService: SearchService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
  ) {}

  @Get('profiles')
  @ApiParam({
    type: 'string',
    name: 'username',
    required: false,
    description: 'The username to search for',
    example: 'johndoe',
  })
  @ApiParam({
    type: 'number',
    name: 'limit',
    required: false,
    description: 'The maximum number of profiles to return',
    example: 10,
  })
  @ApiOperation({ summary: 'Filter profiles by username' })
  @ApiOkResponse({
    description: 'The profiles with the specified username has been returned',
    type: Profile,
    isArray: true,
  })
  async getProfiles(
    @Query('username') username = '',
    @Query('limit') limit = 10,
  ): Promise<Profile[]> {
    this.logger.log('Search request for username: ' + username, SearchController.name);
    const profiles = await this.searchService.getProfiles(username, Number(limit));
    return profiles;
  }

  @Get('posts')
  @ApiParam({
    type: 'string',
    name: 'description',
    required: false,
    description: 'The keyword in caption to search for',
    example: 'Hello world',
  })
  @ApiParam({
    type: 'number',
    name: 'limit',
    required: false,
    description: 'The maximum number of posts to return',
    example: 10,
  })
  @ApiOperation({ summary: 'Filter posts by description' })
  @ApiOkResponse({
    description: 'The posts with the specified description has been returned',
    type: PostResponse,
    isArray: true,
  })
  async getPosts(
    @Query('description') description = '',
    @Query('limit') limit = 10,
  ): Promise<Post[]> {
    this.logger.log(
      'Search request for description: ' + description + ';',
      SearchController.name,
    );

    const posts = await this.searchService.getPosts(description, Number(limit));
    return posts;
  }

  @Get('tags')
  @ApiParam({
    type: 'string',
    name: 'tag',
    required: false,
    description: 'The hashtag to search for',
    example: 'HelloWorld',
  })
  @ApiParam({
    type: 'number',
    name: 'limit',
    required: false,
    description: 'The maximum number of posts to return',
    example: 10,
  })
  @ApiOperation({ summary: 'Filter posts by hashtag' })
  @ApiOkResponse({
    description: 'The posts with the specified tags has been returned',
    type: PostResponse,
    isArray: true,
  })
  async getTags(@Query('tag') tag = '', @Query('limit') limit = 10): Promise<Post[]> {
    this.logger.log('Search request for hashtag: ' + tag, SearchController.name);
    const tags = await this.searchService.getTags(tag, Number(limit));
    return tags;
  }
}

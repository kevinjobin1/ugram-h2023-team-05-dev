import { Controller, Get, Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('API')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Redirect to API documentation' })
  @ApiResponse({ status: 301, description: 'Redirect to /api' })
  @Redirect('/api', 301)
  getRoot(): void {}

  @Get('/health')
  @ApiOperation({ summary: 'Get health status' })
  @ApiResponse({ status: 200, description: 'Health status: OK' })
  getHealth(): string {
    return this.appService.getHealth();
  }
}

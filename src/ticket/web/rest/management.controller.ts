import { Controller, Get, Logger, UseInterceptors } from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiExcludeEndpoint,
} from '@nestjs/swagger';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('management')
@UseInterceptors(LoggingInterceptor)
@ApiTags('management-controller')
export class ManagementController {
  logger = new Logger('ManagementController');

  @ApiExcludeEndpoint()
  @Get('/info')
  @ApiOperation({ summary: 'Microservice Info' })
  @ApiResponse({
    status: 200,
    description: 'Check if the microservice is up',
  })
  info(): any {
    return {
      activeProfiles: 'dev',
      'display-ribbon-on-profiles': 'dev',
    };
  }
}

import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'API service health and uptime check' })
  check() {
    return {
      status: 'ok',
      service: 'Bug Refinery API',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}

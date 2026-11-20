import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateLeadDto } from './dto/create-lead.dto';
import { LeadResponseDto, PublicConfigDto } from './dto/lead-response.dto';
import { LeadsService } from './leads.service';

@ApiTags('leads')
@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Get('public-config')
  @ApiOperation({ summary: 'Retrieve public frontend configuration (Turnstile, lead state)' })
  @ApiResponse({ status: 200, type: PublicConfigDto })
  getPublicConfig(): PublicConfigDto {
    return this.leadsService.getPublicConfig();
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Submit an application or course enquiry lead' })
  @ApiResponse({ status: 200, description: 'Lead successfully submitted', type: LeadResponseDto })
  @ApiResponse({ status: 400, description: 'Validation failed or bot detected' })
  @ApiResponse({ status: 429, description: 'Too many requests' })
  async createLead(
    @Body() dto: CreateLeadDto,
    @Req() req: Request,
  ): Promise<LeadResponseDto> {
    const clientIp =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
      req.socket.remoteAddress ||
      '127.0.0.1';

    return this.leadsService.createLead(dto, clientIp);
  }

  @Get()
  @ApiOperation({ summary: 'List leads with pagination and optional source filter' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'offset', required: false, type: Number })
  @ApiQuery({ name: 'source', required: false, type: String })
  async findAll(
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
    @Query('source') source?: string,
  ) {
    return this.leadsService.findAll(limit ? Number(limit) : 50, offset ? Number(offset) : 0, source);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get aggregated statistics of leads by track and volume' })
  async getStats() {
    return this.leadsService.getStats();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get lead details by ID' })
  async findOne(@Param('id') id: string) {
    return this.leadsService.findOne(id);
  }
}

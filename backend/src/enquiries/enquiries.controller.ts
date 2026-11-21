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
import { CreateEnquiryDto } from './dto/create-enquiry.dto';
import { EnquiryResponseDto } from './dto/enquiry-response.dto';
import { EnquiriesService } from './enquiries.service';

@ApiTags('enquiries')
@Controller('enquiries')
export class EnquiriesController {
  constructor(private readonly enquiriesService: EnquiriesService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Submit an enterprise IT project enquiry or technical RFP brief' })
  @ApiResponse({
    status: 200,
    description: 'Enquiry successfully registered',
    type: EnquiryResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Validation failed or bot honeypot triggered' })
  async createEnquiry(
    @Body() dto: CreateEnquiryDto,
    @Req() req: Request,
  ): Promise<EnquiryResponseDto> {
    const clientIp =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
      req.socket.remoteAddress ||
      '127.0.0.1';

    return this.enquiriesService.createEnquiry(dto, clientIp);
  }

  @Get()
  @ApiOperation({ summary: 'List project enquiries with pagination and filters' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'offset', required: false, type: Number })
  @ApiQuery({ name: 'serviceCategory', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, type: String })
  async findAll(
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
    @Query('serviceCategory') serviceCategory?: string,
    @Query('status') status?: string,
  ) {
    return this.enquiriesService.findAll(
      limit ? Number(limit) : 50,
      offset ? Number(offset) : 0,
      serviceCategory,
      status,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve enquiry details by UUID' })
  async findOne(@Param('id') id: string) {
    return this.enquiriesService.findOne(id);
  }
}

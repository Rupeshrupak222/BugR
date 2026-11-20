import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { StorageService } from './storage.service';

export interface StorageFile {
  buffer: Buffer;
  originalname: string;
  mimetype: string;
  size: number;
}

@ApiTags('storage')
@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Upload file to Supabase Storage' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: StorageFile,
    @Req() req: Request,
  ) {
    const user = req.user as { id: string } | undefined;
    return this.storageService.uploadFile(
      file.buffer,
      file.originalname,
      file.mimetype,
      user?.id,
    );
  }

  @Get('url')
  @ApiOperation({ summary: 'Generate public or signed URL for stored asset' })
  @ApiQuery({ name: 'path', required: true })
  async getUrl(@Query('path') path: string) {
    return this.storageService.getFileUrl(path);
  }

  @Delete(':path')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete file from Supabase Storage' })
  async deleteFile(@Param('path') path: string) {
    return this.storageService.deleteFile(path);
  }
}

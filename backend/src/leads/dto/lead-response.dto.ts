import { ApiProperty } from '@nestjs/swagger';

export class LeadResponseDto {
  @ApiProperty({ example: true })
  saved: boolean;

  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6', required: false })
  id?: string;

  @ApiProperty({ example: 'Lead recorded successfully', required: false })
  message?: string;
}

export class PublicConfigDto {
  @ApiProperty({ example: true })
  enabled: boolean;

  @ApiProperty({ example: '0x4AAAAAAAx...', nullable: true })
  siteKey: string | null;
}

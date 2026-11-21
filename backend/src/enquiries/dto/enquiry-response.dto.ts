import { ApiProperty } from '@nestjs/swagger';

export class EnquiryResponseDto {
  @ApiProperty({ description: 'Internal primary key UUID' })
  id: string;

  @ApiProperty({ description: 'Client or system request identifier' })
  requestId: string;

  @ApiProperty({ description: 'Status of the enquiry', example: 'NEW' })
  status: string;

  @ApiProperty({ description: 'Confirmation message' })
  message: string;

  @ApiProperty({ description: 'Submission timestamp' })
  submittedAt: string;
}

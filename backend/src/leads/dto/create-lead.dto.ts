import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateLeadDto {
  @ApiProperty({ description: 'Client-generated UUIDv4 request ID for idempotency', example: 'c8087268-306d-495d-9fc0-42ba2cfa5fbc' })
  @IsUUID('4', { message: 'requestId must be a valid UUIDv4' })
  requestId: string;

  @ApiProperty({ description: 'Full name of applicant or inquirer', example: 'Alex Mercer' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name: string;

  @ApiProperty({ description: 'Email address', example: 'alex.mercer@example.com' })
  @IsEmail({}, { message: 'Valid email address is required' })
  @MaxLength(254)
  email: string;

  @ApiProperty({ description: 'Phone number with country or national code', example: '+91 9876543210' })
  @IsString()
  @Matches(/^\+?[\d ()-]+$/, { message: 'Invalid phone number format' })
  @MaxLength(32)
  phone: string;

  @ApiProperty({ description: 'Source / program / track title', example: 'Python Full Stack' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  source: string;

  @ApiPropertyOptional({ description: 'Optional message or enquiry context', example: 'Interested in the upcoming 9-week cohort.' })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  message?: string;

  @ApiPropertyOptional({ description: 'Turnstile verification token if enabled' })
  @IsOptional()
  @IsString()
  @MaxLength(2048)
  token?: string;

  @ApiPropertyOptional({ description: 'Honeypot field (must remain empty)' })
  @IsOptional()
  @IsString()
  @MaxLength(256)
  website?: string;
}

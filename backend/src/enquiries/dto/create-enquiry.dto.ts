import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateEnquiryDto {
  @ApiPropertyOptional({ description: 'Client-generated request ID for idempotency', example: 'c8087268-306d-495d-9fc0-42ba2cfa5fbc' })
  @IsOptional()
  @IsString()
  requestId?: string;

  @ApiProperty({ description: 'Full name of contact', example: 'Sarah Jenkins' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name: string;

  @ApiProperty({ description: 'Business email address', example: 's.jenkins@acme.com' })
  @IsEmail({}, { message: 'Valid email address is required' })
  @MaxLength(254)
  email: string;

  @ApiPropertyOptional({ description: 'Phone number', example: '+1 555-0199' })
  @IsOptional()
  @IsString()
  @MaxLength(32)
  phone?: string;

  @ApiProperty({ description: 'Company or organization name', example: 'Acme Healthtech Inc.' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  company: string;

  @ApiProperty({ description: 'Required service category', example: 'custom-software-development' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  serviceCategory: string;

  @ApiPropertyOptional({ description: 'Project or business archetype', example: 'b2b-saas' })
  @IsOptional()
  @IsString()
  @MaxLength(80)
  projectType?: string;

  @ApiProperty({ description: 'Technical scope or problem description', example: 'Modernize legacy monolithic patient portal into distributed micro-frontends with HIPAA compliance.' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(4000)
  description: string;

  @ApiPropertyOptional({ description: 'Target budget bracket', example: '25k-50k' })
  @IsOptional()
  @IsString()
  @MaxLength(80)
  budgetRange?: string;

  @ApiPropertyOptional({ description: 'Target delivery horizon', example: '3-6-months' })
  @IsOptional()
  @IsString()
  @MaxLength(80)
  timeline?: string;

  @ApiPropertyOptional({ description: 'Required capability tags', example: ['auth-rbac', 'cloud-iac', 'high-availability'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  features?: string[];

  @ApiPropertyOptional({ description: 'Honeypot field (must remain empty)' })
  @IsOptional()
  @IsString()
  @MaxLength(256)
  honeypot?: string;
}

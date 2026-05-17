import { IsString, IsOptional, IsArray, ArrayNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ContactDataFormDto {
  @ApiProperty({ example: 'Juan Pérez' })
  @IsString()
  name!: string;

  @ApiPropertyOptional({ example: 'juan@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: '+34123456789' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: 'Descripción del problema' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: ['Pintura', 'Agua'], type: [String] })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  services!: string[];
}
import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UploadFileDto {
  @ApiProperty({
    description: 'Описание файла',
    type: 'string',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Загружаемый файл',
    type: 'string',
    format: 'binary',
  })
  file: Express.Multer.File;
}
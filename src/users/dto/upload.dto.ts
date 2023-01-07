import { ApiProperty } from '@nestjs/swagger';

export interface AvatarDto {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  formFile: any;
}

import { ApiProperty } from '@nestjs/swagger';
export class LocationDto {
  @ApiProperty({ description: 'id', type: Number })
  id: number;
  @ApiProperty({ description: 'ten_vi_tri', type: String })
  ten_vi_tri: string;
  @ApiProperty({ description: 'tinh_thanh', type: String })
  tinh_thanh: string;
  @ApiProperty({ description: 'quoc_gia', type: String })
  quoc_gia: string;
  @ApiProperty({ description: 'hinh_anh', type: String, required: false })
  hinh_anh?: string;
}

export class UploadLocationDto {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

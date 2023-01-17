import { ApiProperty } from '@nestjs/swagger';

export class BinhLuanInfo {
  @ApiProperty({ description: 'id', type: Number })
  id: number;
  @ApiProperty({ description: 'ma_phong', type: Number })
  maPhong: number;
  @ApiProperty({ description: 'ma_nguoi_binh_luan', type: Number })
  maNguoiBinhLuan: number;
  @ApiProperty({ description: 'ngay_binh_luan', type: String })
  ngayBinhLuan: string;
  @ApiProperty({ description: 'noi_dung', type: String })
  noiDung: string;
  @ApiProperty({ description: 'sao_binh_luan', type: Number })
  saoBinhLuan: number;
}

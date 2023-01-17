import { ApiProperty } from '@nestjs/swagger';

export class BookingInfo {
  @ApiProperty({ description: 'id', type: Number })
  id: number;
  @ApiProperty({ description: 'ma_phong', type: Number })
  maPhong: number;
  @ApiProperty({ description: 'ngay_den', type: String, format: 'date-time' })
  ngayDen: Date;
  @ApiProperty({ description: 'ngay_di', type: String, format: 'date-time' })
  ngayDi: Date;
  @ApiProperty({ description: 'so_luong_khach', type: Number })
  soLuongKhach: number;
  @ApiProperty({ description: 'ma_nguoi_dung', type: Number })
  maNguoiDung: number;
}

import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { BookingInfo } from './dto';

@Injectable()
export class BookingService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  prisma: PrismaClient = new PrismaClient();

  async getBooking(): Promise<any> {
    try {
      const result = await this.prisma.datPhong.findMany();
      return { check: true, data: result };
    } catch (error) {
      console.log(error);
      return { check: false, data: 'Lỗi Server !!!' };
    }
  }

  async getBookingById(id: number): Promise<any> {
    try {
      if (!isNaN(id)) {
        const checkBooking = await this.prisma.datPhong.findFirst({
          where: {
            id,
          },
        });
        if (checkBooking) {
          return { check: true, data: checkBooking };
        } else {
          return { check: false, data: 'Lịch đặt không tồn tại' };
        }
      } else {
        return { check: false, data: 'Id không hợp lệ !!!' };
      }
    } catch (error) {
      console.log(error);
      return { check: false, data: 'Lỗi Server !!!' };
    }
  }

  async createBooking(body: BookingInfo): Promise<any> {
    try {
      const { ngayDen, ngayDi, maNguoiDung, maPhong, soLuongKhach } = body;
      const ngay_den = new Date(ngayDen);
      const ngay_di = new Date(ngayDi);
      const checkUser = await this.prisma.nguoiDung.findFirst({
        where: { id: maNguoiDung },
      });
      const checkRoom = await this.prisma.phong.findFirst({
        where: { id: maPhong },
      });
      if (checkUser) {
        if (checkRoom) {
          const result = await this.prisma.datPhong.create({
            data: {
              phong_id: maPhong,
              nguoi_dung_id: maNguoiDung,
              ngay_den,
              ngay_di,
              so_luong_khach: soLuongKhach,
            },
          });
          return { check: true, data: result };
        } else {
          return { check: false, data: 'Phòng không tồn tại !!!' };
        }
      } else {
        return { check: false, data: 'Người dùng không tồn tại !!!' };
      }
    } catch (error) {
      console.log(error);
      return { check: false, data: 'Lỗi Server !!!' };
    }
  }

  async updateBooking(body: BookingInfo, id: number): Promise<any> {
    try {
      const checkBooking = await this.prisma.datPhong.findFirst({
        where: { id },
      });

      if (checkBooking) {
        const { maNguoiDung, maPhong } = body;
        const checkUser = await this.prisma.nguoiDung.findFirst({
          where: { id: maNguoiDung },
        });
        const checkRoom = await this.prisma.phong.findFirst({
          where: { id: maPhong },
        });
        if (checkUser) {
          if (checkRoom) {
            const result = await this.prisma.datPhong.update({
              where: { id },
              data: {
                nguoi_dung_id: maNguoiDung,
                phong_id: maPhong,
                ngay_den: body.ngayDen,
                ngay_di: body.ngayDi,
                so_luong_khach: body.soLuongKhach,
              },
            });
            return { check: true, data: 'Cập nhật lịch thành công' };
          } else {
            return { check: false, data: 'Phòng không tồn tại !!!' };
          }
        } else {
          return { check: false, data: 'Người dùng không tồn tại !!!' };
        }
      } else {
        return {
          check: false,
          data: 'Lịch đặt không tồn tại',
        };
      }
    } catch (error) {
      console.log(error);
      return { check: false, data: 'Lỗi Server !!!' };
    }
  }

  async deleteBooking(id: number): Promise<any> {
    try {
      const checkBooking = await this.prisma.datPhong.findFirst({
        where: { id },
      });
      if (checkBooking) {
        await this.prisma.datPhong.delete({
          where: {
            id,
          },
        });
        return { check: true, data: 'Xoá lịch đặt thành công' };
      } else {
        return {
          check: false,
          data: 'Lịch đặt không tồn tại',
        };
      }
    } catch (error) {
      console.log(error);
      return { check: false, data: 'Lỗi Server !!!' };
    }
  }

  async getBookingFollowUser(id: number): Promise<any> {
    try {
      const checkUser = await this.prisma.nguoiDung.findFirst({
        where: { id },
      });
      if (checkUser) {
        const result = await this.prisma.datPhong.findMany({
          where: {
            NguoiDung: {
              id,
            },
          },
        });
        return { check: true, data: result };
      } else {
        return { check: false, data: 'Người dùng không tồn tại' };
      }
    } catch (error) {
      console.log(error);
      return { check: false, data: 'Lỗi Server !!!' };
    }
  }
}

import { RoomDto } from './dto/room.dto';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class RoomService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  prisma: PrismaClient = new PrismaClient({ log: ['error'] });

  async getRoomInfo(): Promise<RoomDto[]> {
    return await this.prisma.phong.findMany();
  }
  async createRoom(body: RoomDto, user_id: number): Promise<any> {
    try {
      const {
        ten_phong,
        khach,
        phong_ngu,
        phong_tam,
        gia_tien,
        may_giat,
        giuong,
        mo_ta,
        tivi,
        wifi,
        ban_la,
        ban_ui,
        dieu_hoa,
        bep,
        do_xe,
        ho_boi,
        hinh_anh,
        ma_vi_tri,
      } = body;
      if (ten_phong) {
        const checkTenPhong = await this.prisma.phong.findFirst({
          where: {
            ten_phong,
          },
        });
        if (checkTenPhong) {
          return { check: false, data: 'Phòng đã tồn tại' };
        } else {
          const checkViTri = await this.prisma.viTri.findFirst({
            where: {
              id: ma_vi_tri,
            },
          });
          if (checkViTri) {
            const addRoom = await this.prisma.phong.create({
              data: {
                ten_phong,
                khach,
                phong_ngu,
                phong_tam,
                giuong,
                mo_ta,
                gia_tien,
                may_giat,
                ban_la,
                ban_ui,
                tivi,
                dieu_hoa,
                wifi,
                bep,
                do_xe,
                ho_boi,
                hinh_anh,
                viTri: {
                  connect: {
                    id: ma_vi_tri,
                  },
                },
                NguoiDung: {
                  connect: {
                    id: user_id,
                  },
                },
              },
            });
            return { check: true, data: addRoom };
          } else {
            return { check: false, data: 'Vị trí chưa được thêm' };
          }
        }
      } else {
        return { check: false, data: 'Thêm phòng bị lỗi' };
      }
    } catch (error) {
      console.log(error);
      return 'Lỗi server!!!';
    }
  }
  async getRoomByLocationId(maViTri: number): Promise<any> {
    try {
      const checkViTri = await this.prisma.viTri.findFirst({
        where: {
          id: maViTri,
        },
      });
      if (checkViTri) {
        const result = await this.prisma.phong.findMany({
          where: { viTri: { id: maViTri } },
        });
        return { check: true, data: result };
      } else {
        return { check: false, data: 'Vị trí chưa được thêm' };
      }
    } catch (error) {
      console.log(error);
      return 'Lỗi server!!!';
    }
  }
  async getRoomById(id: number): Promise<any> {
    try {
      if (isNaN(id)) {
        return { check: false, data: 'Id không hợp lệ' };
      } else {
        const checkRoom = await this.prisma.phong.findFirst({
          where: {
            id,
          },
        });
        if (checkRoom) {
          return { check: true, data: checkRoom };
        } else {
          return { check: false, data: 'Phòng không tồn tại' };
        }
      }
    } catch (error) {
      console.log(error);
      return 'Lỗi server!!!';
    }
  }
  async updateRoom(id: number, body: RoomDto, user_id: number): Promise<any> {
    try {
      const {
        ten_phong,
        khach,
        phong_ngu,
        phong_tam,
        gia_tien,
        may_giat,
        giuong,
        mo_ta,
        tivi,
        wifi,
        ban_la,
        ban_ui,
        dieu_hoa,
        bep,
        do_xe,
        ho_boi,
        hinh_anh,
        ma_vi_tri,
      } = body;
      const checkRoom = await this.prisma.phong.findFirst({
        where: {
          id,
        },
      });
      if (checkRoom) {
        const checkViTri = await this.prisma.viTri.findFirst({
          where: {
            id: ma_vi_tri,
          },
        });
        if (checkViTri) {
          await this.prisma.phong.update({
            where: { id },
            data: {
              ten_phong,
              khach,
              phong_ngu,
              phong_tam,
              gia_tien,
              may_giat,
              giuong,
              mo_ta,
              tivi,
              wifi,
              ban_la,
              ban_ui,
              dieu_hoa,
              bep,
              do_xe,
              ho_boi,
              hinh_anh,
              viTri: {
                connect: {
                  id: ma_vi_tri,
                },
              },
              NguoiDung: {
                connect: {
                  id: user_id,
                },
              },
            },
          });
          return { check: true, data: 'Cập nhật thông tin phòng thành công' };
        } else {
          return { check: false, data: 'Vị trí chưa được thêm' };
        }
      } else {
        return { check: false, data: 'Phòng không tồn tại' };
      }
    } catch (error) {
      console.log(error);
      return 'Lỗi server!!!';
    }
  }
  async deleteRoom(id: number): Promise<any> {
    try {
      const checkRoom = await this.prisma.phong.findFirst({
        where: {
          id,
        },
      });
      if (checkRoom) {
        await this.prisma.phong.delete({
          where: {
            id,
          },
        });
        return { check: true, data: 'Xoá phòng thành công!!!' };
      } else {
        return { check: false, data: 'Phòng không tồn tại' };
      }
    } catch (error) {
      console.log(error);
      return 'Lỗi server!!!';
    }
  }

  async uploadImageRoom(filename: string, id: number): Promise<any> {
    try {
      if (isNaN(id)) {
        return { check: false, data: 'Id không hợp lệ' };
      } else {
        const checkRoom = await this.prisma.viTri.findFirst({
          where: { id },
        });
        if (checkRoom) {
          await this.prisma.viTri.update({
            data: { hinh_anh: filename },
            where: { id },
          });
          return { check: true, data: 'Upload thành công' };
        } else {
          return { check: true, data: 'Upload Thất bại' };
        }
      }
    } catch (error) {
      console.log(error);
      return { check: true, data: 'Lỗi Server!!!' };
    }
  }
}

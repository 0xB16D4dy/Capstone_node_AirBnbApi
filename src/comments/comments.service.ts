import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { BinhLuanInfo } from './dto';

@Injectable()
export class CommentsService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  prisma: PrismaClient = new PrismaClient();
  async getComments(): Promise<any> {
    try {
      const result = await this.prisma.binhLuan.findMany();
      return { check: true, data: result };
    } catch (error) {
      console.log(error);
      return { check: false, data: 'Lỗi Server' };
    }
  }

  async createComment(params: { body: BinhLuanInfo }): Promise<any> {
    try {
      const { maPhong, maNguoiBinhLuan, ngayBinhLuan, noiDung, saoBinhLuan } =
        params.body;
      const result = await this.prisma.binhLuan.create({
        data: {
          ngay_binh_luan: ngayBinhLuan,
          noi_dung: noiDung,
          sao_binh_luan: saoBinhLuan,
          nguoi_dung_id: maNguoiBinhLuan,
          phong_id: maPhong,
        },
      });
      return { check: true, data: result };
    } catch (error) {
      console.log(error);
      return { check: false, data: 'Lỗi Server' };
    }
  }

  async updateComment(params: {
    body: BinhLuanInfo;
    id: number;
  }): Promise<any> {
    try {
      const { maPhong, maNguoiBinhLuan, ngayBinhLuan, noiDung, saoBinhLuan } =
        params.body;
      const { id } = params;
      const checkBinhLuan = await this.prisma.binhLuan.findFirst({
        where: {
          id,
        },
      });
      if (checkBinhLuan) {
        const checkIdRoom = await this.prisma.phong.findFirst({
          where: {
            id: maPhong,
          },
        });
        const checkUser = await this.prisma.nguoiDung.findFirst({
          where: {
            id: maNguoiBinhLuan,
          },
        });
        if (checkUser) {
          if (checkIdRoom) {
            await this.prisma.binhLuan.update({
              where: {
                id,
              },
              data: {
                ngay_binh_luan: ngayBinhLuan,
                noi_dung: noiDung,
                sao_binh_luan: saoBinhLuan,
                nguoi_dung_id: maNguoiBinhLuan,
                phong_id: maPhong,
              },
            });
            return { check: true, data: 'Cập nhật bình luận thành công' };
          } else {
            return { check: false, data: 'Phòng không tồn tại !!!' };
          }
        } else {
          return { check: false, data: 'Người dùng không tồn tại !!!' };
        }
      } else {
        return { check: false, data: 'Bình luận không tồn tại !!!' };
      }
    } catch (error) {
      console.log(error);
      return { check: false, data: 'Lỗi Server' };
    }
  }

  async deleteComment(id: number): Promise<any> {
    try {
      const checkComment = await this.prisma.binhLuan.findFirst({
        where: {
          id,
        },
      });
      if (checkComment) {
        await this.prisma.binhLuan.delete({
          where: { id },
        });
        return { check: true, data: 'Xoá bình luận thành công' };
      } else {
        return { check: false, data: 'Bình luận không tồn tại' };
      }
    } catch (error) {
      console.log(error);
      return { check: false, data: 'Lỗi Server !!!' };
    }
  }

  async getCommentFollowRoom(id: number): Promise<any> {
    try {
      if (!isNaN(id)) {
        const result = await this.prisma.binhLuan.findMany({
          where: {
            Phong: {
              id,
            },
          },
        });
        return { check: true, data: result };
      } else {
        return { check: false, data: 'Id không hợp lệ !!!' };
      }
    } catch (error) {
      console.log(error);
      return { check: false, data: 'Lỗi Server !!!' };
    }
  }
}

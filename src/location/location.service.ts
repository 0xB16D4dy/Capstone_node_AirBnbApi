import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LocationDto } from './dto';

@Injectable()
export class LocationService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  prisma: PrismaClient = new PrismaClient();
  async getLocation(): Promise<any> {
    try {
      const result = await this.prisma.viTri.findMany();
      return { check: true, data: result };
    } catch (error) {
      console.log(error);
    }
  }

  async createLocation(body: LocationDto): Promise<any> {
    try {
      const { ten_vi_tri, tinh_thanh, quoc_gia, hinh_anh } = body;
      const checkViTri = await this.prisma.viTri.findFirst({
        where: { ten_vi_tri },
      });
      if (!checkViTri) {
        const newViTri = await this.prisma.viTri.create({
          data: {
            ten_vi_tri,
            tinh_thanh,
            quoc_gia,
            hinh_anh,
          },
        });
        return { check: true, data: newViTri };
      } else {
        return { check: false, data: 'Vị trí đã tồn tại' };
      }
    } catch (error) {
      console.log(error);
      return 'Lỗi Server';
    }
  }
  async getOffsetPaginationListLocation(params: {
    skip?: number;
    take?: number;
    keyword?: any;
  }): Promise<any> {
    try {
      const { skip, take, keyword } = params;
      if (isNaN(skip)) {
        const resultTake = await this.prisma.viTri.findMany({
          take,
        });
        return { check: true, data: resultTake };
      } else {
        if (take) {
          const result = await this.prisma.viTri.findMany({
            skip,
            take,
            where: {
              ten_vi_tri: {
                contains: keyword,
              },
            },
            orderBy: {
              id: 'asc',
            },
          });
          return { check: true, data: result };
        } else {
          return { check: false, data: 'vui lòng nhập pageSize' };
        }
      }
    } catch (error) {
      console.log(error);
      return { check: false, data: 'Lỗi server!!!' };
    }
  }

  async getLocationById(id: number): Promise<any> {
    try {
      if (isNaN(id)) {
        return { check: false, data: 'Id không hợp lệ' };
      } else {
        const checkLocation = await this.prisma.viTri.findFirst({
          where: {
            id,
          },
        });
        if (checkLocation) {
          return { check: true, data: checkLocation };
        } else {
          return { check: false, data: 'Vị trí không tồn tại' };
        }
      }
    } catch (error) {
      console.log(error);
      return { check: true, data: 'Lỗi Server!!!' };
    }
  }

  async updateLocation(id: number, body: LocationDto): Promise<any> {
    try {
      if (!isNaN(id)) {
        const { ten_vi_tri, tinh_thanh, quoc_gia } = body;
        const checkLocation = await this.prisma.viTri.findFirst({
          where: {
            id,
          },
        });
        if (checkLocation) {
          await this.prisma.viTri.update({
            where: {
              id,
            },
            data: {
              ten_vi_tri,
              tinh_thanh,
              quoc_gia,
            },
          });
          return {
            check: true,
            data: 'Cập nhật thông tin vị trí thành công !!!',
          };
        } else {
          return { check: false, data: 'Vị trí không tồn tại' };
        }
      } else {
        return { check: false, data: 'Id không hợp lệ' };
      }
    } catch (error) {
      console.log(error);
      return {
        check: false,
        data: 'Lỗi Server!!!',
      };
    }
  }

  async deleteLocation(id: number): Promise<any> {
    try {
      if (!isNaN(id)) {
        const checkLocation = await this.prisma.viTri.findFirst({
          where: {
            id,
          },
        });
        if (checkLocation) {
          await this.prisma.viTri.delete({
            where: { id },
          });
          return { check: true, data: 'Xoá vị trí thành công!!!' };
        } else {
          return { check: false, data: 'Vị trí không tồn tại!!!' };
        }
      } else {
        return { check: false, data: 'Id không hợp lệ' };
      }
    } catch (error) {
      console.log(error);
      return { check: false, data: 'Lỗi Server' };
    }
  }

  async uploadImageLocation(filename: string, id: number): Promise<any> {
    try {
      if (isNaN(id)) {
        return { check: false, data: 'Id không hợp lệ' };
      } else {
        const checkLocation = await this.prisma.viTri.findFirst({
          where: { id },
        });
        if (checkLocation) {
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

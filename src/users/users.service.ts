import { UpdateUserDto } from './dto/users.dto';
import { Injectable } from '@nestjs/common';
import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserInfoDto } from './dto';
import { ResponeRes } from './interfaces';
@Injectable()
export class UsersService {
  prisma: PrismaClient = new PrismaClient({ log: ['error'] });
  async findAll(): Promise<any[]> {
    return await this.prisma.nguoiDung.findMany();
  }
  //uploadAvatar
  async uploadAvatar(id: number, filename: string): Promise<boolean> {
    try {
      await this.prisma.nguoiDung.update({
        data: { anh_dai_dien: filename },
        where: { id },
      });
      return true;
    } catch (error) {
      console.log(error);
    }
  }
  async createUser(
    email: string,
    name: string,
    pass_word: string,
    phone: string,
    birth_day: string,
    gender: string,
    role: Role,
  ): Promise<any> {
    try {
      const checkEmail = await this.prisma.nguoiDung.findFirst({
        where: {
          email,
        },
      });

      if (!checkEmail) {
        const passWordHash = bcrypt.hashSync(pass_word, 12);
        const newUser = await this.prisma.nguoiDung.create({
          data: {
            email,
            name,
            pass_word: passWordHash,
            phone,
            birth_day,
            gender,
            role,
          },
        });
        return { check: true, data: newUser };
      } else {
        return { check: false, data: 'Email đã tồn tại !!!' };
      }
    } catch (error) {
      console.log(error);
    }
  }
  async deleteUser(id: number): Promise<string> {
    try {
      const checkUser = await this.prisma.nguoiDung.findFirst({
        where: {
          id,
        },
      });
      if (checkUser) {
        await this.prisma.nguoiDung.delete({
          where: {
            id,
          },
        });
        return `Xoá người dùng ${id} thành công !!!`;
      } else {
        return 'Người dùng không tồn tại !!!';
      }
    } catch (error) {
      console.log(error);
      return 'Lỗi server!!!';
    }
  }
  async getInfoUser(id: number): Promise<any> {
    try {
      const checkUser = await this.prisma.nguoiDung.findFirst({
        where: {
          id,
        },
      });
      if (checkUser) {
        return { check: true, data: checkUser };
      } else {
        return { check: false, data: 'User không tồn tại !!!' };
      }
    } catch (error) {
      console.log(error);
      return 'Lỗi server!!!';
    }
  }

  async updateUser(id: number, data: UpdateUserDto): Promise<ResponeRes> {
    try {
      const checkUser = await this.prisma.nguoiDung.findFirst({
        where: {
          id,
        },
      });
      if (checkUser) {
        const passWordHash = bcrypt.hashSync(data.pass_word, 12);
        const updateUser = await this.prisma.nguoiDung.update({
          where: {
            id,
          },
          data: {
            email: data.email,
            name: data.name,
            pass_word: passWordHash,
            phone: data.phone,
            birth_day: data.birth_day,
            gender: data.gender,
            role: data.role,
          },
        });
        return {
          check: true,
          data: updateUser,
        };
      } else {
        return { check: false, data: 'User không tồn tại !!!' };
      }
    } catch (error) {
      console.log(error);
      return { check: false, data: 'Lỗi server!!!' };
    }
  }

  async getOffsetPaginationList(params: {
    skip?: number;
    take?: number;
    keyword?: string;
  }): Promise<any> {
    try {
      const { skip, take, keyword } = params;

      if (isNaN(skip)) {
        return await this.prisma.nguoiDung.findMany({
          take,
        });
      } else {
        if (take) {
          return await this.prisma.nguoiDung.findMany({
            skip,
            take,
            where: {
              name: {
                contains: keyword,
              },
            },
            orderBy: {
              id: 'asc',
            },
          });
        } else {
          return 'vui lòng nhập pageSize';
        }
      }
    } catch (error) {
      console.log(error);
      return 'Lỗi server!!!';
    }
  }

  async searchByName(keyword: string): Promise<any> {
    try {
      if (keyword) {
        const result = await this.prisma.nguoiDung.findMany({
          where: {
            name: {
              contains: keyword,
            },
          },
        });
        return { check: true, data: result };
      } else {
        return {
          check: false,
          data: 'Vui lòng điền keyword!!!',
        };
      }
    } catch (error) {
      console.log(error);
      return 'Lỗi server!!!';
    }
  }
}

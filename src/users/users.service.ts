import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserDto } from './dto';

@Injectable()
export class UsersService {
  prisma: PrismaClient = new PrismaClient({ log: ['query'] });
  async findAll(): Promise<UserDto[]> {
    return await this.prisma.nguoiDung.findMany({});
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
}

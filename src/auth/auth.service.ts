import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}
  //connect prisma
  prisma: PrismaClient = new PrismaClient({ log: ['query'] });
  //signIn
  async signin(email: string, pass_word: string): Promise<any> {
    try {
      const checkEmail = await this.prisma.nguoiDung.findFirst({
        where: {
          email,
        },
      });
      if (checkEmail) {
        const isMatch = bcrypt.compareSync(pass_word, checkEmail.pass_word);
        console.log(isMatch);
        if (isMatch) {
          const token = await this.jwt.sign(checkEmail, { expiresIn: '2d' });
          return { check: true, data: token };
        } else {
          return { check: false, data: 'Sai mật khẩu !!!' };
        }
      } else {
        return { check: false, data: 'Sai email !!!' };
      }
    } catch (error) {
      console.log(error);
    }
  }
  //signUp
  async signup(
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
}

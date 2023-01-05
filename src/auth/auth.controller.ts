import { ResponseResult } from './interfaces/auth.interface';
import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { NguoiDung } from './dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //Route Post signIn
  @Post('signin')
  async signin(@Body() body: NguoiDung): Promise<string> {
    const { email, password } = body;
    const checkLogin = await this.authService.signin(email, password);
    if (checkLogin.check) {
      //jwt
      return checkLogin.data;
    } else {
      throw new HttpException(checkLogin.data, HttpStatus.UNAUTHORIZED);
    }
  }
  //Route POST signUp
  @Post('signup')
  async signup(@Body() body: NguoiDung): Promise<string> {
    const { email, password, name, phone, birthday, gender, role } = body;
    const checkSignUp = await this.authService.signup(
      email,
      name,
      password,
      phone,
      birthday,
      gender,
      role,
    );
    if (checkSignUp.check) {
      return checkSignUp.data;
    } else {
      throw new BadRequestException(checkSignUp.data);
    }
  }
}

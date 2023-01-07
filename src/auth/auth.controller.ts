import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { NguoiDungLogDto, NguoiDungRegDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //Route Post signIn
  @Post('signin')
  async signin(@Body() body: NguoiDungLogDto): Promise<string> {
    const { email, pass_word } = body;
    const checkLogin = await this.authService.signin(email, pass_word);
    if (checkLogin.check) {
      //jwt
      return checkLogin.data;
    } else {
      throw new HttpException(checkLogin.data, HttpStatus.UNAUTHORIZED);
    }
  }
  //Route POST signUp
  @Post('signup')
  async signup(@Body() body: NguoiDungRegDto): Promise<string> {
    const { email, pass_word, name, phone, birth_day, gender, role } = body;
    const checkSignUp = await this.authService.signup(
      email,
      name,
      pass_word,
      phone,
      birth_day,
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

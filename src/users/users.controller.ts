import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {
  Controller,
  UseInterceptors,
  UploadedFile,
  Param,
  UseGuards,
  Post,
  Get,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AvatarDto, UserDto } from './dto';
import { NguoiDung } from 'src/auth/dto';

@Controller('/api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  //Interceptor to storage file upload
  @UseInterceptors(
    FileInterceptor('formFile', {
      storage: diskStorage({
        destination: './public/img',
        filename(req, file, callback) {
          const date = new Date();
          callback(null, `${date.getTime()}-${file.originalname}`);
        },
      }),
    }),
  )
  //Route POST upload Avatar
  @UseGuards(AuthGuard('jwt'))
  @Post('upload-avatar/:id')
  upload(
    @Param('id') id: string,
    @UploadedFile() file: AvatarDto,
  ): Promise<boolean> {
    return this.usersService.uploadAvatar(Number(id), file.filename);
  }
  //Route GET all users
  @Get('')
  getUser(): Promise<UserDto[] | undefined> {
    return this.usersService.findAll();
  }
  //Route POST create user
}

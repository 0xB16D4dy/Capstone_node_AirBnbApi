import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {
  Controller,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Post,
  Get,
  Req,
  Body,
  BadRequestException,
  ForbiddenException,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AvatarDto, FileUploadDto, UpdateUserDto, UserInfoDto } from './dto';
import { NguoiDungRegDto } from './../auth/dto/auth.dto';
import { Request } from 'express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiTags,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('/api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  //Route GET all users
  @Get('')
  async getUser(): Promise<any[]> {
    return await this.usersService.findAll();
  }
  //Route POST create user
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('')
  async createUser(
    @Req() req: Request,
    @Body() body: NguoiDungRegDto,
  ): Promise<any> {
    const checkAdmin = req.user['role'] === 'ADMIN' ? true : false;
    // kiểm tra xem user có phải là admin ko nếu phải thì mới được tạo mới
    if (checkAdmin) {
      const { email, pass_word, name, phone, birth_day, gender, role } = body;
      const checkSignUp = await this.usersService.createUser(
        email,
        name,
        pass_word,
        phone,
        birth_day,
        gender,
        role,
      );
      if (checkSignUp.check) {
        return { statusCode: 200, content: checkSignUp.data };
      } else {
        throw new BadRequestException(checkSignUp.data);
      }
    } else {
      throw new ForbiddenException('Không phải là admin!!!');
    }
  }
  //Route DELETE user
  @ApiParam({
    name: 'id',
    type: 'integer',
    format: 'int32',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteUser(@Req() req: Request): Promise<string> {
    const checkAdmin = req.user['role'] === 'ADMIN' ? true : false;
    if (checkAdmin) {
      const { id } = req.params;
      return this.usersService.deleteUser(Number(id));
    }
  }
  //Route GET pagination search
  @ApiQuery({
    name: 'pageIndex',
    type: 'integer',
    required: false,
  })
  @ApiQuery({
    name: 'pageSize',
    type: 'integer',
    required: false,
  })
  @ApiQuery({
    name: 'keyword',
    type: 'string',
    required: false,
  })
  @Get('/phan-trang-tim-kiem')
  async paginationSearchInfo(
    @Query('pageIndex') pageIndex: string,
    @Query('pageSize') pageSize: string,
    @Query('keyword') keyword: string,
  ): Promise<any> {
    return this.usersService.getOffsetPaginationList({
      skip: +pageIndex,
      take: +pageSize,
      keyword,
    });
  }
  //Route GET get info user by id
  @ApiParam({
    name: 'id',
    type: 'integer',
    format: 'int32',
  })
  @Get(':id')
  async getInfoUser(@Req() req: Request): Promise<UserInfoDto | any> {
    const { id } = req.params;
    const checkResult = await this.usersService.getInfoUser(+id);
    if (checkResult.check) {
      return { statusCode: 200, content: checkResult.data };
    } else {
      throw new BadRequestException(checkResult.data);
    }
  }
  //Route PUT update info user by id
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: 'integer',
    format: 'int32',
  })
  @Put(':id')
  async updateInfoUser(
    @Req() req: Request,
    @Body() body: UpdateUserDto,
  ): Promise<UpdateUserDto | any> {
    const { id } = req.params;
    const checkUpdate = await this.usersService.updateUser(+id, body);
    if (checkUpdate.check) {
      return { statusCode: 200, content: checkUpdate.data };
    } else {
      throw new BadRequestException(checkUpdate.data);
    }
  }
  //Rout GET search by name
  @ApiParam({
    name: 'tenNguoiDung',
    type: 'string',
  })
  @Get('search/:tenNguoiDung')
  async searchByName(@Req() req: Request): Promise<any> {
    const { tenNguoiDung } = req.params;
    const checkResult = await this.usersService.searchByName(tenNguoiDung);
    if (checkResult.check) {
      return { statusCode: 200, content: checkResult.data };
    } else {
      throw new BadRequestException(checkResult.data);
    }
  }
  //Route POST upload Avatar
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'avatar',
    type: FileUploadDto,
  })
  @UseInterceptors(
    //Interceptor to storage file upload
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
  @Post('upload-avatar')
  upload(
    @Req() req: Request,
    @UploadedFile() file: AvatarDto,
  ): Promise<boolean> {
    return this.usersService.uploadAvatar(req.user['id'], file.filename);
  }
}

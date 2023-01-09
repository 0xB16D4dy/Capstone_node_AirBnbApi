import { RoomService } from './room.service';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { RoomDto, RoomImageDto } from './dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiQuery,
  ApiParam,
  ApiResponse,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FileUploadDto } from 'src/users/dto';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Room')
@Controller('api/phong-thue')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get('')
  async getRoom(): Promise<RoomDto[]> {
    return this.roomService.getRoomInfo();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('')
  async creatRoom(
    @Req() req: Request,
    @Body() body: RoomDto,
  ): Promise<RoomDto | any> {
    const id = req.user['id'];
    const checkResult = await this.roomService.createRoom(body, id);
    if (checkResult.check) {
      return { statusCode: 200, content: checkResult.data };
    } else {
      throw new BadRequestException(checkResult.data);
    }
  }

  @ApiQuery({
    name: 'maViTri',
    required: false,
  })
  @Get('lay-phong-theo-vi-tri')
  async getRoomByLocationId(@Query('maViTri') maViTri: string): Promise<any> {
    const checkResult = await this.roomService.getRoomByLocationId(+maViTri);
    if (checkResult.check) {
      return { statusCode: 200, content: checkResult.data };
    } else {
      throw new BadRequestException(checkResult.data);
    }
  }
  @ApiParam({ name: 'id', type: 'integer', format: 'int32' })
  @Get(':id')
  async getRoomById(@Param('id') id: string): Promise<any> {
    const checkResult = await this.roomService.getRoomById(+id);
    if (checkResult.check) {
      return { statusCode: 200, content: checkResult.data };
    } else {
      throw new BadRequestException(checkResult.data);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @Put(':id')
  async updateRoomInfo(
    @Param('id') id: string,
    @Body() body: RoomDto,
    @Req() req: Request,
  ): Promise<any> {
    const user_id = req.user['id'];
    const checkResult = await this.roomService.updateRoom(+id, body, user_id);
    if (checkResult.check) {
      return { statusCode: 200, content: checkResult.data };
    } else {
      throw new BadRequestException(checkResult.data);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @Delete(':id')
  async deleteRoomInfo(@Param('id') id: string): Promise<any> {
    const checkResult = await this.roomService.deleteRoom(+id);
    if (checkResult.check) {
      return { statusCode: 200, content: checkResult.data };
    } else {
      throw new BadRequestException(checkResult.data);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'hinh phong',
    type: FileUploadDto,
  })
  @ApiQuery({
    name: 'maPhong',
    type: 'string',
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
  @Post('upload-hinh-phong')
  async uploadImageRoom(
    @Req() req: Request,
    @UploadedFile() file: RoomImageDto,
  ): Promise<any> {
    const maPhong = req.query['maPhong'];
    const checkResult = await this.roomService.uploadImageRoom(
      file.filename,
      +maPhong,
    );
    if (checkResult.check) {
      return { statusCode: 200, content: checkResult.data };
    } else {
      throw new BadRequestException(checkResult.data);
    }
  }
}

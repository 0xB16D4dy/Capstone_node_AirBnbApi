import {
  BadRequestException,
  Body,
  Controller,
  Get,
  UseGuards,
  Post,
  Req,
  UnauthorizedException,
  Param,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { LocationDto, UploadLocationDto } from './dto';
import { FileUploadDto } from 'src/users/dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { LocationService } from './location.service';

@ApiTags('Location')
@Controller('api/vi-tri')
export class LocationController {
  constructor(private locationService: LocationService) {}
  @Get()
  async getViTri(): Promise<any> {
    const checkResult = await this.locationService.getLocation();
    if (checkResult.check) {
      return { statusCodes: 200, content: checkResult.data };
    } else {
      throw new BadRequestException(checkResult.data);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createViTri(
    @Req() req: Request,
    @Body() body: LocationDto,
  ): Promise<any> {
    const checkAdmin = req.user['role'] === 'ADMIN' ? true : false;
    if (checkAdmin) {
      const checkResult = await this.locationService.createLocation(body);
      if (checkResult.check) {
        return { statusCodes: 200, content: checkResult.data };
      } else {
        throw new BadRequestException(checkResult.data);
      }
    } else {
      throw new UnauthorizedException('Bạn không phải là admin!!!');
    }
  }

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
  @Get('phan-trang-tim-kiem')
  async getPaginationLocation(@Req() req: Request): Promise<any> {
    const { pageIndex, pageSize, keyword } = req.query;
    const checkResult =
      await this.locationService.getOffsetPaginationListLocation({
        skip: +pageIndex,
        take: +pageSize,
        keyword,
      });
    if (checkResult.check) {
      return { statusCodes: 200, content: checkResult.data };
    } else {
      throw new BadRequestException(checkResult.data);
    }
  }

  @ApiParam({
    name: 'id',
    type: 'integer',
    format: 'int32',
  })
  @Get(':id')
  async getLocationById(@Param('id') id: string): Promise<any> {
    const checkResult = await this.locationService.getLocationById(+id);
    if (checkResult.check) {
      return { statusCode: 200, content: checkResult.data };
    } else {
      throw new BadRequestException(checkResult.data);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: 'integer',
    format: 'int32',
  })
  @Put(':id')
  async updateLocation(
    @Body() body: LocationDto,
    @Param('id') id: string,
  ): Promise<any> {
    const checkResult = await this.locationService.updateLocation(+id, body);
    if (checkResult.check) {
      return { statusCode: 200, content: checkResult.data };
    } else {
      throw new BadRequestException(checkResult.data);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    name: 'id',
    type: 'integer',
    format: 'int32',
  })
  @Delete(':id')
  async deleteLocation(@Param('id') id: string): Promise<any> {
    const checkResult = await this.locationService.deleteLocation(+id);
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
    description: 'hinh vi tri',
    type: FileUploadDto,
  })
  @ApiQuery({
    name: 'maViTri',
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
  @Post('upload-hinh-vitri')
  async uploadImageRoom(
    @Req() req: Request,
    @UploadedFile() file: UploadLocationDto,
  ): Promise<any> {
    const maViTri = req.query['maViTri'];
    const checkResult = await this.locationService.uploadImageLocation(
      file.filename,
      +maViTri,
    );
    if (checkResult.check) {
      return { statusCode: 200, content: checkResult.data };
    } else {
      throw new BadRequestException(checkResult.data);
    }
  }
}

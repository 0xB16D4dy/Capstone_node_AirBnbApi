import { BinhLuanInfo } from './dto/binhluan.dto';
import { CommentsService } from './comments.service';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Comments')
@Controller('api/binh-luan')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get('')
  async getComments(): Promise<any> {
    const checkResult = await this.commentsService.getComments();
    if (checkResult.check) {
      return { statusCodes: 200, content: checkResult.data };
    } else {
      throw new BadRequestException(checkResult.data);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('')
  async createComment(@Body() body: BinhLuanInfo): Promise<any> {
    const checkResult = await this.commentsService.createComment({
      body,
    });
    if (checkResult.check) {
      return { statusCodes: 200, content: checkResult.data };
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
  @ApiBody({
    description: 'model',
    type: BinhLuanInfo,
    required: false,
  })
  @Put(':id')
  async updateComment(@Req() req: Request): Promise<any> {
    const { id } = req.params;
    const checkResult = await this.commentsService.updateComment({
      body: req.body,
      id: +id,
    });
    if (checkResult.check) {
      return { statusCodes: 200, content: checkResult.data };
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
  async delete(@Req() req: Request): Promise<any> {
    const { id } = req.params;
    const checkResult = await this.commentsService.deleteComment(+id);
    if (checkResult.check) {
      return { statusCodes: 200, content: checkResult.data };
    } else {
      throw new BadRequestException(checkResult.data);
    }
  }

  @ApiParam({
    name: 'MaPhong',
    type: 'integer',
    format: 'int32',
  })
  @Get('lay-binh-luan-theo-phong/:MaPhong')
  async getCommentFollowRoom(@Param('MaPhong') MaPhong: string): Promise<any> {
    const checkResult = await this.commentsService.getCommentFollowRoom(
      +MaPhong,
    );
    if (checkResult.check) {
      return { statusCodes: 200, content: checkResult.data };
    } else {
      throw new BadRequestException(checkResult.data);
    }
  }
}

import { BookingService } from './booking.service';
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
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { BookingInfo } from './dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Booking')
@Controller('/api/dat-phong')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Get('')
  async getBooking(): Promise<any> {
    const checkResult = await this.bookingService.getBooking();
    if (checkResult.check) {
      return { statusCodes: 200, content: checkResult.data };
    } else {
      throw new BadRequestException(checkResult.data);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('')
  async createBooking(@Body() body: BookingInfo): Promise<any> {
    const checkResult = await this.bookingService.createBooking(body);
    if (checkResult.check) {
      return { statusCodes: 200, content: checkResult.data };
    } else {
      throw new BadRequestException(checkResult.data);
    }
  }

  @Get(':id')
  async getBookingById(@Param('id') id: string): Promise<any> {
    const checkResult = await this.bookingService.getBookingById(+id);
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
  @Put(':id')
  async updateBooking(
    @Body() body: BookingInfo,
    @Param('id') id: string,
  ): Promise<any> {
    // console.log(body);
    const checkResult = await this.bookingService.updateBooking(body, +id);
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
  async deleteBooking(@Param('id') id: string): Promise<any> {
    const checkResult = await this.bookingService.deleteBooking(+id);
    if (checkResult.check) {
      return { statusCodes: 200, content: checkResult.data };
    } else {
      throw new BadRequestException(checkResult.data);
    }
  }

  @Get('lay-theo-nguoi-dung/:MaNguoiDung')
  async getBookingFollowUser(
    @Param('MaNguoiDung') MaNguoiDung: string,
  ): Promise<any> {
    const checkResult = await this.bookingService.getBookingFollowUser(
      +MaNguoiDung,
    );
    if (checkResult.check) {
      return { statusCodes: 200, content: checkResult.data };
    } else {
      throw new BadRequestException(checkResult.data);
    }
  }
}

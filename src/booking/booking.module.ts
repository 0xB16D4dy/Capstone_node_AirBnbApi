import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}

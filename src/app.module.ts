import { RoomService } from './room/room.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RoomController } from './room/room.controller';
import { RoomModule } from './room/room.module';
import { LocationService } from './location/location.service';
import { LocationController } from './location/location.controller';
import { LocationModule } from './location/location.module';
import { BookingService } from './booking/booking.service';
import { BookingController } from './booking/booking.controller';
import { BookingModule } from './booking/booking.module';
import { CommentsService } from './comments/comments.service';
import { CommentsController } from './comments/comments.controller';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    RoomModule,
    LocationModule,
    BookingModule,
    CommentsModule,
  ],
  // controllers: [LocationController, BookingController, CommentsController],
  // providers: [LocationService, BookingService, CommentsService],
})
export class AppModule {}

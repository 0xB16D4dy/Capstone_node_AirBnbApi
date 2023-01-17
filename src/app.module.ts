import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RoomModule } from './room/room.module';
import { LocationModule } from './location/location.module';
import { BookingModule } from './booking/booking.module';
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
})
export class AppModule {}

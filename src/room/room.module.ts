import { JwtStrategy } from './../auth/strategy/jwt.strategy';
import { RoomController } from './room.controller';
import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('SECRET_KEY'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [RoomController],
  providers: [RoomService, JwtStrategy],
})
export class RoomModule {}

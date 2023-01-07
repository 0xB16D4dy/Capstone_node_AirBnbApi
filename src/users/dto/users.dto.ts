import { ApiProperty, PartialType } from '@nestjs/swagger';
import { NguoiDungRegDto } from 'src/auth/dto';

export enum UserRole {
  User = 'USER',
  Admin = 'ADMIN',
}

export class UserInfoDto {
  @ApiProperty({ description: 'id', type: Number })
  id: number;
  @ApiProperty({ description: 'email', type: String })
  email: string;
  @ApiProperty({ description: 'name', type: String })
  name: string;
  @ApiProperty({ description: 'password', type: String })
  pass_word: string;
  @ApiProperty({ description: 'phone', type: String })
  phone: string;
  @ApiProperty({ description: 'birthday', type: String })
  birth_day: string;
  @ApiProperty({ description: 'gender', type: String })
  gender: string;
  @ApiProperty({ description: 'anh_dai_dien', type: String })
  anh_dai_dien: string;
  @ApiProperty({ description: 'role', enum: UserRole })
  role: string;
}

export class UpdateUserDto extends PartialType(NguoiDungRegDto) {}

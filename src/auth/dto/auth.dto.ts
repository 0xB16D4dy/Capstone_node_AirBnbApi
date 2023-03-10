import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export enum UserRole {
  User = 'USER',
  Admin = 'ADMIN',
}
export class NguoiDungRegDto {
  @ApiProperty({ description: 'id', type: Number })
  id: number;
  @ApiProperty({ description: 'name', type: String })
  name: string;
  @ApiProperty({ description: 'email', type: String })
  email: string;
  @ApiProperty({ description: 'password', type: String })
  pass_word: string;
  @ApiProperty({ description: 'phone', type: String })
  phone: string;
  @ApiProperty({ description: 'birthday', type: String })
  birth_day: string;
  @ApiProperty({ description: 'gender', type: String })
  gender: string;
  //ADMIN or USER (default is USER)
  @ApiProperty({ description: 'role', enum: UserRole })
  role: Role;
}

export class NguoiDungLogDto {
  @ApiProperty({ description: 'email', type: String })
  email: string;
  @ApiProperty({ description: 'password', type: String })
  pass_word: string;
}

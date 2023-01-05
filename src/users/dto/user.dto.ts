import { Role } from '@prisma/client';

export interface UserDto {
  id: number;
  name: string;
  email: string;
  pass_word: string;
  phone: string;
  birth_day: string;
  gender: string;
  role: Role;
}

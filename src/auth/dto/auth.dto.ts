import { Role } from '@prisma/client';
export interface NguoiDung {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  gender: string;
  role: Role;
}

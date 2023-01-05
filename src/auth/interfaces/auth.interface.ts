import { NguoiDung } from '@prisma/client';

export interface ResponseResult {
  check: boolean;
  data: string | NguoiDung;
}

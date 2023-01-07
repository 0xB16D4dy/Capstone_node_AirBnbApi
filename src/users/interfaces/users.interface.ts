import { UpdateUserDto } from '../dto';

export interface ResponeRes {
  check: boolean;
  data: string | UpdateUserDto;
}

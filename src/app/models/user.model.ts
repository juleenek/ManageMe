import { UserRole } from './enums/role.enum';

export interface User {
  id: number;
  login: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  password: string;
}

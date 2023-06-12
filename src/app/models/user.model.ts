import { UserRole } from './enums/role.enum';
import { Functionality } from './functionality.model';

export interface User {
  id: string;
  login: string;
  first_name: string;
  last_name: string;
  functionalities: Functionality[];
  role: UserRole;
  password: string;
}

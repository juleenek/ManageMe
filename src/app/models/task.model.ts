import { Status } from './enums/status.enum';
import { Functionality } from './functionality.model';

export interface Task {
  id: string;
  name: string;
  description: string;
  status: Status;
  createdAt: number;
  functionality: Functionality;
}

import { Status } from './enums/status.enum';
import { Functionality } from './functionality.model';

export interface Task {
  id: number;
  name: string;
  description: string;
  status: Status;
  created_at: Date;
  functionality: Functionality;
}

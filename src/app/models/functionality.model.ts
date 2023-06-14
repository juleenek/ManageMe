import { Status } from './enums/status.enum';
import { Task } from './task.model';

export interface Functionality {
  id: string;
  name: string;
  description: string;
  createdAt: number;
  status: Status;
  tasks: Task[];
}

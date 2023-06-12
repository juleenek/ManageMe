import { Status } from './enums/status.enum';
import { Task } from './task.model';

export interface Functionality {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  status: Status;
  tasks: Task[];
}

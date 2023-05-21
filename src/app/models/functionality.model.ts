import { Priority } from './enums/priority.enum';
import { Status } from './enums/status.enum';
import { Task } from './task.model';

export interface Functionality {
  id: number;
  name: string;
  priority: Priority;
  owner_id: number;
  status: Status;
  tasks: Task[];
}

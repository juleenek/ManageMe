import { Status } from './enums/status.enum';

export interface Task {
  id: number;
  name: string;
  description: string;
  status: Status;
  created_at: Date;
  start_date: Date;
  end_date: Date;
  assigned_used_id: number;
}

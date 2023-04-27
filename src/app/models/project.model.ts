import { Functionality } from './functionality.model';

export interface Project {
  id: number;
  name: string;
  description: string;
  functionalities: Functionality[];
}

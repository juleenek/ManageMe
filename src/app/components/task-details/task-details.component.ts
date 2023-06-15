import { Component, Input } from '@angular/core';
import { Functionality } from 'src/app/models/functionality.model';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent {
  createdDate: any;

  ngOnInit(): void {
    this.createdDate = new Date(this.task.createdAt).toLocaleDateString('pl', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  @Input() functionality: Functionality = {} as Functionality;
  @Input() task: Task = {} as Task;
}

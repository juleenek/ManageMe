import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Functionality } from 'src/app/models/functionality.model';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-functionality-details',
  templateUrl: './functionality-details.component.html',
  styleUrls: ['./functionality-details.component.scss'],
})
export class FunctionalityDetailsComponent {
  createdDate: any;
  isTaskFormActive: boolean = false;
  isTaskDetailsActive: boolean = false;
  clickedTask: Task = {} as Task;

  ngOnInit(): void {
    this.createdDate = new Date(
      this.functionality.createdAt
    ).toLocaleDateString('pl', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    this.onTaskClick(true, this.functionality.tasks[0]);
  }

  closeDetails() {
    this.closeDetailsEvent.emit(null);
  }

  changeTaskFormActive(isActive: boolean) {
    this.isTaskFormActive = isActive;
  }

  onTaskClick(isActive: boolean, task: Task) {
    this.isTaskDetailsActive = isActive;
    this.clickedTask = task;
  }

  @Input() functionality: Functionality = {} as Functionality;
  @Output() closeDetailsEvent = new EventEmitter<Functionality | null>();
}

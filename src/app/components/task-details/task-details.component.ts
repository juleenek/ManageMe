import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Status } from 'src/app/models/enums/status.enum';
import { Functionality } from 'src/app/models/functionality.model';
import { Task } from 'src/app/models/task.model';
import { User } from 'src/app/models/user.model';
import { UserApiService } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent {
  createdDate: any;
  readonly Status = Status;
  currentUser: User = {} as User;

  constructor(private apiService: UserApiService) {}

  ngOnInit(): void {
    this.createdDate = new Date(this.task.createdAt).toLocaleDateString('pl', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.apiService.getMetaUser().subscribe((response) => {
      this.apiService
        .getUserById(response.currentUser.id)
        .subscribe((response) => {
          this.currentUser = response;
          this.updateFunctionalityStatus();
        });
    });
  }

  onBackClick() {
    this.taskActiveEvent.emit(false);
  }

  onExitClick() {
    this.detailsActiveEvent.emit(true);
  }

  onStatusClick(status: Status) {
    const updatedTask: Task = {
      ...this.task,
      status: status,
    } as Task;
    this.task.status = status;

    const updatedFunctionality: Functionality = { ...this.functionality };

    updatedFunctionality.tasks = updatedFunctionality.tasks.map((task) => {
      if (task.id === updatedTask.id) {
        return updatedTask;
      }
      return task;
    });

    this.currentUser.functionalities = this.currentUser.functionalities.map(
      (func) => {
        if (func.id === this.functionality.id) {
          return updatedFunctionality;
        }
        return func;
      }
    );

    this.apiService
      .updateFunctionalities(this.currentUser.id, this.currentUser)
      .subscribe(() => {
        this.functionality = updatedFunctionality;
        this.updateFunctionalityStatus();
      });
  }

  updateFunctionalityStatus(): void {
    const functionalityToUpdate = this.currentUser.functionalities.find(
      (func) => func.id === this.functionality.id
    );

    if (functionalityToUpdate) {
      const allTasksDone = functionalityToUpdate.tasks.every(
        (task) => task.status === Status.DONE
      );

      if (allTasksDone) {
        functionalityToUpdate.status = Status.DONE;
      } else {
        functionalityToUpdate.status = Status.TODO;
      }

      this.apiService
        .updateFunctionalities(this.currentUser.id, this.currentUser)
        .subscribe(() => {
          this.functionality.status = functionalityToUpdate.status;
        });
    }
  }


  @Input() functionality: Functionality = {} as Functionality;
  @Input() task: Task = {} as Task;
  @Output() taskActiveEvent = new EventEmitter<boolean>();
  @Output() detailsActiveEvent = new EventEmitter<boolean>();
}

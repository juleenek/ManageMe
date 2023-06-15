import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Status } from 'src/app/models/enums/status.enum';
import { Functionality } from 'src/app/models/functionality.model';
import { Task } from 'src/app/models/task.model';
import { User } from 'src/app/models/user.model';
import { UserApiService } from 'src/app/services/user-api.service';

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
  currentUser: User = {} as User;

  constructor(private apiService: UserApiService) {}

  ngOnChange(): void {
    this.updateFunctionalityStatus();
  }

  ngOnInit(): void {
    this.createdDate = new Date(
      this.functionality.createdAt
    ).toLocaleDateString('pl', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    this.getCurrentUser();
  }

  closeDetails() {
    this.closeDetailsEvent.emit(null);
    this.getCurrentUser();
  }

  changeTaskFormActive(isActive: boolean) {
    this.isTaskFormActive = isActive;
  }

  onTaskClick(isActive: boolean, task: Task = {} as Task) {
    this.isTaskDetailsActive = isActive;
    this.clickedTask = task;
    this.getCurrentUser();
  }

  updateFunctionalityStatus(): void {
    const functionalityToUpdate = this.currentUser.functionalities.find(
      (func) => func.id === this.functionality.id
    );

    if (functionalityToUpdate) {
      const allTasksDone = functionalityToUpdate.tasks.every(
        (task) => task.status === Status.DONE
      );

      if (functionalityToUpdate.tasks.length === 0) {
        functionalityToUpdate.status = Status.TODO;
      } else {
        if (allTasksDone) {
          functionalityToUpdate.status = Status.DONE;
        } else {
          functionalityToUpdate.status = Status.TODO;
        }
      }

      this.apiService
        .updateFunctionalities(this.currentUser.id, this.currentUser)
        .subscribe(() => {
          this.functionality.status = functionalityToUpdate.status;
        });
    }
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

  @Input() functionality: Functionality = {} as Functionality;
  @Output() closeDetailsEvent = new EventEmitter<Functionality | null>();
}

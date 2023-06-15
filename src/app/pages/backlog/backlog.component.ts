import { Component } from '@angular/core';
import { Status } from 'src/app/models/enums/status.enum';
import { Functionality } from 'src/app/models/functionality.model';
import { User } from 'src/app/models/user.model';
import { UserApiService } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss'],
})
export class BacklogComponent {
  isFormActive: boolean = false;
  currentUser: User = {} as User;
  selectedFunctionality: Functionality | null = null;

  constructor(private apiService: UserApiService) {}
  ngOnInit(): void {
    this.getCurrentUser();
  }

  changeFormActive(isActive: boolean) {
    this.isFormActive = isActive;
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

  updateFunctionalityStatus(): void {
    this.currentUser.functionalities.forEach((functionality) => {
      const allTasksDone = functionality.tasks.every(
        (task) => task.status === Status.DONE
      );

      if (allTasksDone) {
        functionality.status = Status.DONE;
      } else {
        functionality.status = Status.TODO;
      }
    });

    this.apiService
      .updateFunctionalities(this.currentUser.id, this.currentUser)
      .subscribe();
  }

  onSelect(functionality: Functionality | null) {
    this.selectedFunctionality = functionality;
    this.updateFunctionalityStatus();
  }
}

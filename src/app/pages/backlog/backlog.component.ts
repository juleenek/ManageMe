import { Component } from '@angular/core';
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
          this.onSelect(this.currentUser.functionalities[0]);
        });
    });
  }

  onSelect(functionality: Functionality | null) {
    this.selectedFunctionality = functionality;
  }
}

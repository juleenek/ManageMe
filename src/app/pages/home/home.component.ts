import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserApiService } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  currentUser: User = {} as User;
  tasksNum: number = 0;

  constructor(private apiService: UserApiService) {}

  ngOnInit(): void {
    this.tasksNum = 0;
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.apiService.getMetaUser().subscribe((response) => {
      this.apiService
        .getUserById(response.currentUser.id)
        .subscribe((response) => {
          this.currentUser = response;
          for (
            let index = 0;
            index < this.currentUser.functionalities.length;
            index++
          ) {
            this.tasksNum +=
              this.currentUser.functionalities[index].tasks.length;
          }
        });
    });
  }
}

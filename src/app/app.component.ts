import { Component } from '@angular/core';
import { User } from './models/user.model';
import { UserRole } from './models/enums/role.enum';
import { UserService } from './services/user/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor() {
    const userService = new UserService();
  }
}

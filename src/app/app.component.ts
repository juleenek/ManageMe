import { Component } from '@angular/core';
import { UserService } from '../app/services/user.service';


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

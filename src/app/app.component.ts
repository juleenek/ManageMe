import { Component } from '@angular/core';
import { User } from './models/user.model';
import { UserRole } from './models/enums/role.enum';

const IS_LOGGED_DEFAULT = false;
const ADMIN: User = {
  id: 1,
  login: 'admin',
  first_name: 'admin',
  last_name: 'admin',
  role: UserRole.ADMIN,
  password: 'p@$$word',
};
const users: User[] = [];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor() {
    users.push(ADMIN);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('isLogged', JSON.stringify(IS_LOGGED_DEFAULT));
  }
}

import { Injectable } from '@angular/core';
import { UserRole } from 'src/app/models/enums/role.enum';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public isUserLoggedIn: boolean;
  private ADMIN: User = {
    id: 1,
    login: 'admin',
    first_name: 'admin',
    last_name: 'admin',
    role: UserRole.ADMIN,
    password: 'p@$$word',
  };
  private users: User[] = [];

  constructor() {
    this.isUserLoggedIn = false;
    localStorage.setItem('isLogged', JSON.stringify(this.isUserLoggedIn));
    this.users.push(this.ADMIN);
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  setUserLoggedIn() {
    this.isUserLoggedIn = true;
    localStorage.setItem('isLogged', JSON.stringify(this.isUserLoggedIn));
  }
  getUserLoggedIn() {
    return localStorage.getItem('isLogged') != null
      ? localStorage.getItem('isLogged')
      : false;
  }
  setUserLoggedOut() {
    this.isUserLoggedIn = false;
    localStorage.setItem('isLogged', JSON.stringify(this.isUserLoggedIn));
  }
}

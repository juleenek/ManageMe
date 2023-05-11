import { Injectable } from '@angular/core';
import { UserRole } from 'src/app/models/enums/role.enum';
import { User } from 'src/app/models/user.model';
import { generateId } from '../utils/generators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public isUserLoggedIn: boolean;
  private ADMIN: User = {
    id: generateId(),
    login: 'admin',
    first_name: 'admin',
    last_name: 'admin',
    role: UserRole.ADMIN,
    password: 'p@$$word',
  };
  private users: User[] = [];

  constructor() {
    !this.getCurrentUser()
      ? (this.isUserLoggedIn = false)
      : (this.isUserLoggedIn = true);

    localStorage.setItem('isLoggedIn', JSON.stringify(this.isUserLoggedIn));
    this.saveUser(this.ADMIN);
  }

  setUserLoggedIn(user: User) {
    this.isUserLoggedIn = true;
    localStorage.setItem('isLoggedIn', JSON.stringify(this.isUserLoggedIn));
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getUserLoggedIn() {
    return localStorage.getItem('isLoggedIn') != null
      ? localStorage.getItem('isLoggedIn')
      : false;
  }

  setUserLoggedOut() {
    this.isUserLoggedIn = false;
    localStorage.setItem('isLoggedIn', JSON.stringify(this.isUserLoggedIn));
  }

  saveUser(user: User) {
    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));
  }
  getCurrentUser() {
    return localStorage.getItem('currentUser');
  }
}

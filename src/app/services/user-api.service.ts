import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { MetaData } from '../models/meta.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  headers = { 'content-type': 'application/json' };

  constructor(private http: HttpClient, private router: Router) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }

  addUser(user: User): Observable<any> {
    const body = JSON.stringify(user);
    return this.http.post('/api/users', body, { headers: this.headers });
  }

  loginUser(user: User): Observable<any> {
    const body: MetaData = {
      isLogged: true,
      currentUser: user,
    };

    this.router.navigate(['/']);

    return this.http.post('/api/meta', body, {
      headers: this.headers,
    });
  }

  logoutUser(): Observable<any> {
    const body: MetaData = {
      isLogged: false,
      currentUser: {} as User,
    };

    this.router.navigate(['/login']);

    return this.http.post('/api/meta', body, {
      headers: this.headers,
    });
  }

  getMetaUser(): Observable<any> {
    return this.http.get<any>('/api/meta');
  }

  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`/api/users/${id}`);
  }
}

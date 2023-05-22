import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { MetaData } from '../models/meta.model';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  headers = { 'content-type': 'application/json' };


  constructor(private http: HttpClient) {}

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

    return this.http.post('/api/meta', body, {
      headers: this.headers,
    });
  }

  getMetaUser(): Observable<any> {
    return this.http.get<any>('/api/meta');
  }
}

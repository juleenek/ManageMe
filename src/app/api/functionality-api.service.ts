import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { MetaData } from '../models/meta.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FunctionalityApiService {
  headers = { 'content-type': 'application/json' };

  constructor(private http: HttpClient, private router: Router) {}

  getFunctionality(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }

  addFunctionality(user: User): Observable<any> {
    const body = JSON.stringify(user);
    return this.http.post('/api/users', body, { headers: this.headers });
  }
}

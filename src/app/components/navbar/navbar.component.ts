import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from 'src/app/api/user-api.service';
import { MetaData } from 'src/app/models/meta.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  meta: MetaData = {} as MetaData;
  currentUser: any;

  constructor(private apiService: UserApiService) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  refreshMeta() {
    this.apiService.getMetaUser().subscribe((data) => {
      this.meta = data;
    });
  }

  getCurrentUser(): void {
    this.apiService.getMetaUser().subscribe((response) => {
      this.currentUser = response.currentUser;
    });
  }

  onLogout() {
    this.apiService.logoutUser().subscribe(() => {
      this.refreshMeta();
    });
  }
}

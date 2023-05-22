import { Component } from '@angular/core';
import { UserApiService } from 'src/app/api/user-api.service';
import { MetaData } from 'src/app/models/meta.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  meta: MetaData = {} as MetaData;
  constructor(private apiService: UserApiService) {}

  refreshMeta() {
    this.apiService.getMetaUser().subscribe((data) => {
      this.meta = data;
    });
  }

  onLogout() {
    this.apiService.logoutUser().subscribe(() => {
      this.refreshMeta();
    });
  }
}

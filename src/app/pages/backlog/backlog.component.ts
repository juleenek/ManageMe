import { Component } from '@angular/core';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss'],
})
export class BacklogComponent {
  isFormActive: boolean = false;

  changeFormActive(isActive: boolean) {
    this.isFormActive = isActive;
  }
}

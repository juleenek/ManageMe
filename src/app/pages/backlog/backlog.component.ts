import { Component } from '@angular/core';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss'],
})
export class BacklogComponent {
  isFormActive: boolean = false;

  toggleFormClick() {
    if (!this.isFormActive) this.isFormActive = true;
  }
}

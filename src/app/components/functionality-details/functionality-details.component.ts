import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Functionality } from 'src/app/models/functionality.model';

@Component({
  selector: 'app-functionality-details',
  templateUrl: './functionality-details.component.html',
  styleUrls: ['./functionality-details.component.scss'],
})
export class FunctionalityDetailsComponent {
  createdDate: any;
  @Input() functionality: Functionality = {} as Functionality;
  @Output() closeDetailsEvent = new EventEmitter<Functionality | null>();

  ngOnInit(): void {
    this.createdDate = new Date(
      this.functionality.createdAt
    ).toLocaleDateString('pl', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  closeDetails() {
    this.closeDetailsEvent.emit(null);
  }
}

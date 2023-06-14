import { Component, Input } from '@angular/core';
import { Status } from 'src/app/models/enums/status.enum';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent {
  readonly Status = Status;
  @Input() status = '';
}

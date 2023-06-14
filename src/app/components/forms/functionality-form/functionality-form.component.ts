import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { FunctionalityForm } from 'src/app/models/form.model';

@Component({
  selector: 'app-functionality-form',
  templateUrl: './functionality-form.component.html',
  styleUrls: ['./functionality-form.component.scss'],
})
export class FunctionalityFormComponent {
  functionality!: FormGroup<FunctionalityForm>;

  @Output() formActiveChangeEvent = new EventEmitter<boolean>();

  changeIsFormActive(isActive: boolean) {
    this.formActiveChangeEvent.emit(isActive);
  }
}

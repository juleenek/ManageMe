import { Component, Input } from '@angular/core';
import { RegisterErrors } from 'src/app/models/types/Errors';
import { DefaultFormErrorsService } from 'src/app/services/default-form-errors.service';

@Component({
  selector: 'app-form-error-message',
  templateUrl: './form-error-message.component.html',
  styleUrls: ['./form-error-message.component.scss'],
})
export class FormErrorMessageComponent {
  formErrorsService = new DefaultFormErrorsService();
  @Input() registerErrors: RegisterErrors =
    this.formErrorsService.getRegisterDefaultFormErrors();
  @Input() formInputName: string | number | null = '';
}

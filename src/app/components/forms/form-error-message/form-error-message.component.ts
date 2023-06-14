import { Component, Input } from '@angular/core';
import { FormErrors } from 'src/app/models/types/Errors';
import { DefaultFormErrorsService } from 'src/app/services/default-form-errors.service';
import { FormInput } from '../../../models/enums/form-input.enum';

@Component({
  selector: 'app-form-error-message',
  templateUrl: './form-error-message.component.html',
  styleUrls: ['./form-error-message.component.scss'],
})
export class FormErrorMessageComponent {
  formErrorsService = new DefaultFormErrorsService();
  readonly FormInputEnum = FormInput;

  @Input() formErrors: FormErrors =
    this.formErrorsService.getRegisterDefaultFormErrors();
  @Input() formInputName: FormInput | null = FormInput.DEFAULT;
}

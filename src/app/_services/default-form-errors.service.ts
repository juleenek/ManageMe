import { Injectable } from '@angular/core';
import { RegisterErrors } from '../_models/types/Errors';

@Injectable({
  providedIn: 'root',
})
export class DefaultFormErrorsService {
  defaultFormErrors: RegisterErrors = {
    isLoginRequiredError: false,
    isLoginLengthError: false,
    isLoginExistError: false,
    isFirstNameRequiredError: false,
    isLastNameRequiredError: false,
    isPasspordRequiredError: false,
    isPassportLengthError: false,
    isPassportExistError: false,
  };

  constructor() {}

  getRegisterDefaultFormErrors() {
    return this.defaultFormErrors;
  }
}

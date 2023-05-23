import { Injectable } from '@angular/core';
import { FormErrors } from '../models/types/Errors';

@Injectable({
  providedIn: 'root',
})
export class DefaultFormErrorsService {
  defaultFormErrors: FormErrors = {
    isLoginRequiredError: false,
    isLoginLengthError: false,
    isLoginExistError: false,
    isFirstNameRequiredError: false,
    isLastNameRequiredError: false,
    isPasspordRequiredError: false,
    isPassportLengthError: false,
    isPassportExistError: false,
    isLoginPageError: false,
  };

  constructor() {}

  getRegisterDefaultFormErrors() {
    return this.defaultFormErrors;
  }
}

import { RegisterForm } from '../models/form.model';
import { FormErrors } from '../models/types/Errors';

export const checkFormErrors = (
  userControls: RegisterForm,
  formErrors: FormErrors
) => {
  let isFirstLoginError = true;
  let isFirstPassportError = true;

  if (userControls.login.hasError('required')) {
    formErrors.isLoginRequiredError = true;
    isFirstLoginError = false;
  }

  if (userControls.login.hasError('minlength') && isFirstLoginError) {
    formErrors.isLoginLengthError = true;
    isFirstLoginError = false;
  }

  if (userControls.first_name.hasError('required')) {
    formErrors.isFirstNameRequiredError = true;
  }

  if (userControls.last_name.hasError('required')) {
    formErrors.isLastNameRequiredError = true;
  }

  if (userControls.password.hasError('required')) {
    formErrors.isPasspordRequiredError = true;
    isFirstPassportError = false;
  }
  if (userControls.password.hasError('minlength') && isFirstPassportError) {
    formErrors.isPassportLengthError = true;
    isFirstPassportError = false;
  }
  return formErrors;
};

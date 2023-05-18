import { RegisterForm } from '../_models/register-form.model';
import { RegisterErrors } from '../_models/types/Errors';

export const checkRegisterErrors = (
  userControls: RegisterForm,
  registerErrors: RegisterErrors
) => {
  let isFirstLoginError = true;
  let isFirstPassportError = true;

  if (userControls.login.hasError('required')) {
    registerErrors.isLoginRequiredError = true;
    isFirstLoginError = false;
  }

  if (userControls.login.hasError('minlength') && isFirstLoginError) {
    registerErrors.isLoginLengthError = true;
    isFirstLoginError = false;
  }

  if (userControls.first_name.hasError('required')) {
    registerErrors.isFirstNameRequiredError = true;
  }

  if (userControls.last_name.hasError('required')) {
    registerErrors.isLastNameRequiredError = true;
  }

  if (userControls.password.hasError('required')) {
    registerErrors.isPasspordRequiredError = true;
    isFirstPassportError = false;
  }
  if (userControls.password.hasError('minlength') && isFirstPassportError) {
    registerErrors.isPassportLengthError = true;
    isFirstPassportError = false;
  }
  return registerErrors;
};

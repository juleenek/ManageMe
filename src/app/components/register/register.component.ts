import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterForm } from 'src/app/models/register-form.model';
import { RegisterErrors } from '../../models/types/Errors';
import { checkRegisterErrors } from '../../utils/checkers';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  user!: FormGroup<RegisterForm>;

  registerErrors: RegisterErrors = {
    isLoginRequiredError: false,
    isLoginLengthError: false,
    isLoginExistError: false,
    isFirstNameRequiredError: false,
    isLastNameRequiredError: false,
    isPasspordRequiredError: false,
    isPassportLengthError: false,
    isPassportExistError: false,
  };

  constructor(private readonly formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.user = this.formBuilder.nonNullable.group({
      login: ['', [Validators.required, Validators.minLength(4)]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    Object.keys(this.registerErrors).forEach((key) => {
      this.registerErrors[key as keyof RegisterErrors] = false;
    });

    if (this.user.status === 'VALID') {
      console.log('zajebiscie');
    }

    if (this.user.status === 'INVALID') {
      this.registerErrors = checkRegisterErrors(
        this.userControls,
        this.registerErrors
      );
    }
  }
  get userControls() {
    return this.user.controls;
  }
}

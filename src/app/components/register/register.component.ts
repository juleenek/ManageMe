import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterForm } from 'src/app/_models/register-form.model';
import { RegisterErrors } from '../../_models/types/Errors';
import { checkRegisterErrors } from '../../_utils/checkers';
import { DefaultFormErrorsService } from '../../_services/default-form-errors.service';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/user.model';
import { generateId } from 'src/app/_utils/generators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  user!: FormGroup<RegisterForm>;
  formErrorsService = new DefaultFormErrorsService();
  userService = new UserService();
  registerErrors: RegisterErrors =
    this.formErrorsService.getRegisterDefaultFormErrors();

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
      const newUser: User = { id: generateId(), ...this.user.value } as User;
      this.userService.saveUser(newUser);
      this.userService.setUserLoggedIn(newUser);
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

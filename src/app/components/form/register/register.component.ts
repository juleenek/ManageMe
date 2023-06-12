import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterForm } from 'src/app/models/user-form.model';
import { FormErrors } from '../../../models/types/Errors';
import { checkFormErrors } from '../../../utils/checkers';
import { DefaultFormErrorsService } from '../../../services/default-form-errors.service';
import { User } from 'src/app/models/user.model';
import { UserApiService } from 'src/app/api/user-api.service';
import { generateId } from 'src/app/utils/generators';
import { Router } from '@angular/router';
import { FormInput } from 'src/app/models/enums/form-input.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  user!: FormGroup<RegisterForm>;
  formErrorsService = new DefaultFormErrorsService();
  formErrors: FormErrors =
    this.formErrorsService.getRegisterDefaultFormErrors();
  users: User[] = [];
  readonly FormInputEnum = FormInput;

  constructor(
    private readonly formBuilder: FormBuilder,
    private apiService: UserApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.formBuilder.nonNullable.group({
      login: ['', [Validators.required, Validators.minLength(4)]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.refreshUsers();
  }

  refreshUsers() {
    this.apiService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  onSubmit() {
    const generetedId = generateId();
    Object.keys(this.formErrors).forEach((key) => {
      this.formErrors[key as keyof FormErrors] = false;
    });

    if (this.user.status === 'VALID') {
      this.apiService
        .addUser({ id: generetedId, ...this.user.value } as User)
        .subscribe(() => {
          this.refreshUsers();
        });

      this.apiService
        .loginUser({ id: generetedId, ...this.user.value } as User)
        .subscribe(() => {
          this.refreshUsers();
        });
      this.router.navigate(['/']);
    }

    if (this.user.status === 'INVALID') {
      this.formErrors = checkFormErrors(this.userControls, this.formErrors);
    }
  }
  get userControls() {
    return this.user.controls;
  }
}

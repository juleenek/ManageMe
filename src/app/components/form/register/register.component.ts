import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterForm } from 'src/app/models/register-form.model';
import { RegisterErrors } from '../../../models/types/Errors';
import { checkRegisterErrors } from '../../../utils/checkers';
import { DefaultFormErrorsService } from '../../../services/default-form-errors.service';
import { User } from 'src/app/models/user.model';
import { UserApiService } from 'src/app/api/user-api.service';
import { generateId } from 'src/app/utils/generators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  user!: FormGroup<RegisterForm>;
  formErrorsService = new DefaultFormErrorsService();
  registerErrors: RegisterErrors =
    this.formErrorsService.getRegisterDefaultFormErrors();
  users: User[] = [];

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
    this.refreshPeople();
  }

  refreshPeople() {
    this.apiService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  onSubmit() {
    Object.keys(this.registerErrors).forEach((key) => {
      this.registerErrors[key as keyof RegisterErrors] = false;
    });

    if (this.user.status === 'VALID') {
      this.apiService
        .addUser({ id: generateId(), ...this.user.value } as User)
        .subscribe(() => {
          this.refreshPeople();
        });

      this.apiService
        .loginUser({ id: generateId(), ...this.user.value } as User)
        .subscribe(() => {
          this.refreshPeople();
        });
      this.router.navigate(['/']);
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

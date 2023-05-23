import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserApiService } from 'src/app/api/user-api.service';
import { FormErrors } from 'src/app/models/types/Errors';
import { LoginForm } from 'src/app/models/user-form.model';
import { User } from 'src/app/models/user.model';
import { DefaultFormErrorsService } from 'src/app/services/default-form-errors.service';
import { generateId } from 'src/app/utils/generators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  user!: FormGroup<LoginForm>;
  users: User[] = [];
  formErrorsService = new DefaultFormErrorsService();
  formErrors: FormErrors =
    this.formErrorsService.getRegisterDefaultFormErrors();

  constructor(
    private readonly formBuilder: FormBuilder,
    private apiService: UserApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.formBuilder.nonNullable.group({
      login: [''],
      password: [''],
    });
    this.refreshUsers();
  }

  refreshUsers() {
    this.apiService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  onSubmit() {
    const loggedUser = this.users.find(
      (data) =>
        data.login === this.user.value.login &&
        data.password === this.user.value.password
    );

    if (loggedUser) {
      this.apiService
        .loginUser({ id: generateId(), ...this.user.value } as User)
        .subscribe(() => {
          this.refreshUsers();
        });
      this.router.navigate(['/']);
    } else {
      this.formErrors.isLoginPageError = true;
    }
  }
}

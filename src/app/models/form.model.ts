import { FormControl } from '@angular/forms';

export type RegisterForm = {
  login: FormControl<string>;
  first_name: FormControl<string>;
  last_name: FormControl<string>;
  password: FormControl<string>;
};

export type LoginForm = {
  login: FormControl<string>;
  password: FormControl<string>;
};

export type FunctionalityForm = {
  name: FormControl<string>;
  description: FormControl<string>;
};

export type TaskForm = {
  name: FormControl<string>;
  description: FormControl<string>;
};

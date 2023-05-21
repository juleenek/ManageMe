import { FormControl } from '@angular/forms';

export type RegisterForm = {
  login: FormControl<string>;
  first_name: FormControl<string>;
  last_name: FormControl<string>;
  password: FormControl<string>;
};

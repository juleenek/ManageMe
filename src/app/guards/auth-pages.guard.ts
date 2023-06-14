import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserApiService } from '../services/user-api.service';
import { MetaData } from '../models/meta.model';
import { map } from 'rxjs/operators';

export const authPagesGuard: CanActivateFn = (route, state) => {
  const userApiService: UserApiService = inject(UserApiService);
  const router: Router = inject(Router);
  return userApiService.getMetaUser().pipe(
    map((res: MetaData) => {
      if (res.isLogged === true) router.navigate(['/']);
      return !res.isLogged;
    })
  );
};

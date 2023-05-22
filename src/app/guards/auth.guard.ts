import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserApiService } from '../api/user-api.service';
import { MetaData } from '../models/meta.model';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const userApiService: UserApiService = inject(UserApiService);
  const router: Router = inject(Router);
  return userApiService.getMetaUser().pipe(
    map((res: MetaData) => {
      if (res.isLogged === false) router.navigate(['/register']);
      return res.isLogged;
    })
  );
};

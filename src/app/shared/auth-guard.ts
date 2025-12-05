import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  let authService = inject(AuthService);
  let router = inject(Router);

  if (authService.isAdmin()) {
    return true;
  }
  router.navigate(['/home']);
  return false;
};

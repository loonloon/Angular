import { CanMatchFn } from '@angular/router';
import { map, skipWhile, take, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanMatchFn = (route, segments) => {
  return inject(AuthService).signedIn$.pipe(
    skipWhile(value => value === null),
    map((value) => !!value),
    take(1),
    tap((authenticated) => {
      return authenticated
    })
  );
};
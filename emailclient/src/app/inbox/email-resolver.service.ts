import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { EmailService } from './email.service';
import { Email } from './email';
import { EMPTY, Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EmailResolverService {
  constructor(private emailService: EmailService, private router: Router) {
  }

  resolve: ResolveFn<Email | any> = (route: ActivatedRouteSnapshot): Observable<Email> | Promise<Email> | Email => {
    const emailId = route.params['id'];
    return this.emailService.getEmail(emailId).pipe(catchError(() => {
      this.router.navigateByUrl('/inbox/not-found');
      return EMPTY;
    }));
  };
}

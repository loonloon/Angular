import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';
import { AuthService, SignUpCredentials } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
  authForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-z9-9]+$/)], [this.uniqueUsername.validate]),
    password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    passwordConfirmation: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
  }, { validators: [this.matchPassword.validate] });

  constructor(private matchPassword: MatchPassword,
    private uniqueUsername: UniqueUsername, private authService: AuthService, private router: Router) {
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    console.log(this.authForm.value);
    this.authService.signUp(this.authForm.value as SignUpCredentials)
      .subscribe({
        next: response => {
          console.log(response);
          this.router.navigateByUrl('/inbox');
        },
        complete: () => {
        },
        error: err => {
          if (err.status === 0) {
            this.authForm.setErrors({ noConnection: true });
          }
          else {
            this.authForm.setErrors({ unknownError: true });
          }
        }
      });
  }
}

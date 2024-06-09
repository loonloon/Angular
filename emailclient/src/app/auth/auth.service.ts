import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

interface UserAvailableResponse {
  available: boolean;
}

export interface SignInCredentials {
  username: string;
  password: string;
}

export interface SignUpCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignUpResponse {
  username: string;
}

interface SignInResponse {
  authenticated: boolean;
  username: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private url = 'https://api.angular-email.com';
  signedIn$ = new BehaviorSubject<boolean | null>(null);
  username = '';

  constructor(private httpClient: HttpClient) {
  }

  checkAuth() {
    return this.httpClient
      .get<SignInResponse>(`${this.url}/auth/signedin`/*, { withCredentials: true }*/)
      .pipe(
        tap(({ authenticated, username }) => {
          this.signedIn$.next(authenticated);
          this.username = username;
        })
      );
  }

  signIn(credentials: SignInCredentials) {
    return this.httpClient
      .post<SignInResponse>(`${this.url}/auth/signin`, credentials/*, { withCredentials: true }*/)
      .pipe(tap(({ username }) => {
        this.signedIn$.next(true);
        this.username = username;
      })
      );
  }

  signUp(values: SignUpCredentials) {
    return this.httpClient
      .post<SignUpResponse>(`${this.url}/auth/signup`, values/*, { withCredentials: true }*/)
      .pipe(tap(({ username }) => {
        this.signedIn$.next(true);
        this.username = username;
      }));
  }

  signOut() {
    return this.httpClient.post(`${this.url}/auth/signout`, {})
      .pipe(
        tap(() => this.signedIn$.next(false))
      );
  }

  usernameAvailable(username: string) {
    return this.httpClient.post<UserAvailableResponse>(`${this.url}/auth/username`, {
      username
    });
  }
}

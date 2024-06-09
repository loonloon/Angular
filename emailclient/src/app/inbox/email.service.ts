import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from './email';

export interface EmailSummary {
  id: string;
  subject: string;
  from: string;
}

@Injectable({
  providedIn: 'root'
})

export class EmailService {
  private url = 'https://api.angular-email.com';
  constructor(private http: HttpClient) {
  }

  getEmail(id: string) {
    return this.http.get<Email>(`${this.url}/emails/${id}`);
  }

  getEmails() {
    return this.http.get<EmailSummary[]>(`${this.url}/emails`);
  }

  sendEmail(email: Email) {
    return this.http.post(`${this.url}/emails`, email);
  }
}

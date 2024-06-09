import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Email } from '../email';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})

export class EmailShowComponent {
  email: Email;

  constructor(private activatedRoute: ActivatedRoute) {
    // Use snapshot data for intial load
    this.email = this.activatedRoute.snapshot.data['email'];

    // Access data from the resolver
    this.activatedRoute.data.subscribe(({ email }) => {
      this.email = email;
    });
  }
}

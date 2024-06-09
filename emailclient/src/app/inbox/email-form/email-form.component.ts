import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Email } from '../email';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})

export class EmailFormComponent implements OnInit {
  @Input() email!: Email;
  @Output() emailSubmit = new EventEmitter();
  emailFormGroup!: FormGroup<{
    to: FormControl<string | null>;
    from: FormControl<string | null>;
    subject: FormControl<string | null>;
    text: FormControl<string | null>;
  }>;

  ngOnInit(): void {
    const { subject, from, to, text } = this.email;
    this.emailFormGroup = new FormGroup({
      to: new FormControl(to, [Validators.required, Validators.email]),
      from: new FormControl({ value: from, disabled: true }),
      subject: new FormControl(subject, [Validators.required]),
      text: new FormControl(text, [Validators.required])
    })
  }

  onSubmit() {
    if (this.emailFormGroup.invalid) {
      return;
    }
    
    console.log(this.emailFormGroup.getRawValue());

    // will exclude disable form control from the value
    this.emailSubmit.emit(this.emailFormGroup.value);
  }
}

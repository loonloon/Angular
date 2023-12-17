import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  amount = 0;
  car = {
    make: 'Toyata',
    model: 'Camry',
    year: 2000
  };
  date = "";
  height = 0;
  miles = 0;
  name = "";

  onAmountChange(value: string) {
    this.amount = parseFloat(value);
  }

  onDateChange(value: string) {
    this.date = value;
  }

  onHeightChange(value: string) {
    this.height = parseFloat(value);
  }

  onMilesChange(value: string) {
    this.miles = parseFloat(value);
  }

  onNameChange(value: string) {
    this.name = value;
  }
}

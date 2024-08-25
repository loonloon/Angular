import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})

export class ForecastComponent {
  forecasts$: Observable<{ dataString: string; temp: number; }[]>;

  constructor(private weatherService: WeatherService) {
    this.forecasts$ = this.weatherService.getForeacast();
  }
}

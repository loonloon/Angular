import { Injectable } from '@angular/core';
import { catchError, filter, map, mergeMap, Observable, of, retry, share, switchMap, tap, throwError, toArray } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NotificationsService } from '../notifications/notifications.service';

interface OpenWeatherRespose {
  list: {
    dt_txt: string;
    main: {
      temp: number;
    };
  }[];
}

@Injectable({
  providedIn: 'root'
})

export class WeatherService {
  private url = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(private httpClient: HttpClient,
    private notificationsService: NotificationsService) {
  }

  getCurrentLocation() {
    return new Observable<GeolocationCoordinates>((observer) => {
      window.navigator.geolocation.getCurrentPosition(position => {
        observer.next(position.coords);
        observer.complete();
      }, err => {
        observer.error(err);
      })
    }).pipe(
      retry(2),
      tap(() => {
        this.notificationsService.addSuccess('Got your location');
      }, catchError(err => {
        this.notificationsService.addError('Failed to get your location');
        return throwError(err);
      }))
    );
  }

  getForeacast() {
    return this.getCurrentLocation()
      .pipe(
        map(coords => {
          return new HttpParams()
            .set('lat', String(coords.latitude))
            .set('lon', String(coords.longitude))
            .set('units', 'metric')
            .set('appid', '00eaf4589dbb82db5f8ff34b9a321ab7')
        }),
        switchMap(params => this.httpClient.get<OpenWeatherRespose>(this.url, { params })),
        mergeMap(value => of(...value.list)), // merge the array into individual values
        filter((value, index) => index % 8 === 0),
        map(value => {
          return {
            dataString: value.dt_txt,
            temp: value.main.temp
          };
        }),
        toArray(),
        share() // share the observable to avoid multiple requests
      );
  }
}

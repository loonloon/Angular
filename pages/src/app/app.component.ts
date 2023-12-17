import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  currentPage = 0;
  images = [{
    title: 'At the Beach',
    url: 'https://unsplash.com/photos/KMn4VEeEPR8'
  },
  {
    title: 'At the Forest',
    url: 'https://unsplash.com/photos/ESkw2ayO2As'
  },
  {
    title: 'At the City',
    url: 'https://unsplash.com/photos/ukvgqriuOgo'
  },
  {
    title: 'At the Snow',
    url: 'https://unsplash.com/photos/Z-BWTNM-bTE'
  }];

  checkWindowIndex(index: number) {
    return Math.abs(this.currentPage - index) < 5;
  }
}

import { Component } from '@angular/core';
import { PhotosService } from '../photos.service';

@Component({
  selector: 'app-photo-show',
  templateUrl: './photo-show.component.html',
  styleUrls: ['./photo-show.component.css']
})

export class PhotoShowComponent {
  photoUrl = "";

  constructor(private photoService: PhotosService) {
    this.photoService = photoService;
    this.fetchPhotos();
  }

  fetchPhotos() {
    this.photoService.getPhoto().subscribe(response => {
      this.photoUrl = response.urls.regular;
    });
  }

  onClick() {
    this.fetchPhotos();
  }
}

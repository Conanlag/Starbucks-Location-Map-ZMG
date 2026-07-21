import { Component } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';



@Component({
  selector: 'app-map',
  imports: [GoogleMap],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class Map {

  center: google.maps.LatLngLiteral = {lat: 24, lng: 12};
  zoom = 4;
  display!: google.maps.LatLngLiteral;

  moveMap(event: google.maps.MapMouseEvent) {
    this.center = (event.latLng!.toJSON());
  }

  move(event: google.maps.MapMouseEvent) {
    this.display = event.latLng!.toJSON();
  }

}

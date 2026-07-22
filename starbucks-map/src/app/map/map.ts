import { Component } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';



@Component({
  selector: 'app-map',
  imports: [GoogleMap],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class Map {

  center: google.maps.LatLngLiteral = {lat: 20.6674465, lng: -103.33896};
  zoom = 12;
  display!: google.maps.LatLngLiteral;

  moveMap(event: google.maps.MapMouseEvent) {
    this.center = (event.latLng!.toJSON());
  }

  move(event: google.maps.MapMouseEvent) {
    this.display = event.latLng!.toJSON();
  }

}

import { Component } from '@angular/core';
import { loadGoogleMaps } from './../google-maps-loader';



@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class Map {
  async ngOnInit() {
  await loadGoogleMaps();
}
}

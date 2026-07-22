import { Component, computed, viewChild, signal} from '@angular/core';
import { GoogleMap, MapAdvancedMarker } from '@angular/google-maps';
import { httpResource } from '@angular/common/http';
import { environment } from '../../environments/environment.development';


export interface Store { 

  "id": string;
  "name": string;
  "displayName": string;
  "address": string;
  "lat": number;
  "lng": number;
}



@Component({
  selector: 'app-map',
  imports: [GoogleMap, MapAdvancedMarker],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class Map {

  storesResource = httpResource<Store[]>(() => './starbucks_zmg.json');

    stores = computed(() => {
    const stores = this.storesResource.value();

    if (!stores) return [];

    return stores.map(store => ({
      ...store,
      displayName:
        store.name === 'Starbucks'
          ? `${store.name} ${store.address.split(',')[0].trim()}`
          : store.name
    }));
  });

  mapOptions: google.maps.MapOptions = { 
    mapId: environment.googleMapsMapId 
  }
  markerOptions: google.maps.marker.AdvancedMarkerElementOptions = { 
    gmpDraggable: false, 

  }


  
  center: google.maps.LatLngLiteral = {lat: 20.6674465, lng: -103.33896};
  zoom = 12;

  selectedStore = signal<Store | null>(null);

  private mapReference = viewChild.required<GoogleMap>(GoogleMap)

  changeLocation(store: Store) {
    this.selectedStore.set(store);
    this.mapReference().panTo({ lat: store.lat, lng: store.lng});
  }

}

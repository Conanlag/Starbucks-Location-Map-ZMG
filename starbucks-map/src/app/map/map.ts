import { Component, computed, ElementRef, viewChild, viewChildren, signal, ChangeDetectionStrategy} from '@angular/core';
import { GoogleMap, MapAdvancedMarker, MapInfoWindow } from '@angular/google-maps';
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
  imports: [GoogleMap, MapAdvancedMarker, MapInfoWindow],
  templateUrl: './map.html',
  styleUrl: './map.css',
  changeDetection: ChangeDetectionStrategy.OnPush
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
  private storesReference = viewChildren<ElementRef<HTMLDivElement>>('store');
    private advancedMarkers= viewChildren<MapAdvancedMarker>(MapAdvancedMarker);

  private infoWindowReference = viewChild.required<MapInfoWindow>(MapInfoWindow);

  changeLocation(store: Store, marker?: MapAdvancedMarker, index?: number) {

    this.infoWindowReference().close();

    this.selectedStore.set(store);
    this.mapReference().panTo({ lat: store.lat, lng: store.lng});

    if (index) {
      console.log(this.advancedMarkers().at(index))

    }

    this.infoWindowReference().open(marker ?? this.advancedMarkers().at(index!));


    const sindex = this.storesResource.value()?.findIndex(s=> s.id === store.id );


    if(sindex !== undefined && sindex >= 0) {
      const  element = this.storesReference().at(sindex);
      
      element?.nativeElement.scrollIntoView({
        behavior:'smooth',
        block: 'center',

      })
    }
  }
  getMarkerContent(store: Store) {
        if (store.id === this.selectedStore()?.id) {
      const beachFlag =
        'https://cdn-icons-png.flaticon.com/128/7345/7345830.png';
      let imgTag = document.createElement('img');
      imgTag.src = beachFlag;
      imgTag.width = 40;
      imgTag.height = 40;

      return imgTag;
    }

    return null;
  
  }

}

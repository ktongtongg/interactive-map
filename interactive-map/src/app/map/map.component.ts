import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet'
import { marker } from 'leaflet';
import { TaxiHttpService } from '../services/taxi-http.service';
import { mockData } from './mockdata';

interface LatLngObject { [index: string]: Leaflet.LatLng } 

const officesLatLong: LatLngObject = {
  london: new Leaflet.LatLng(51.5049375, -0.0964509),
  singapore: new Leaflet.LatLng(1.285194, 103.8522982)
}

export const getLayers = (): Leaflet.Layer[] => {
  return [
    new Leaflet.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    } as Leaflet.TileLayerOptions),
    ...officeMarkers
  ] as Leaflet.Layer[];
};

export const officeMarkers = [
    marker(officesLatLong.singapore, {
      title: 'Singapore Office'
    }),
    marker(officesLatLong.london, {
      title: 'London Office'
    }),
  ]


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  constructor(private httpService: TaxiHttpService) {}

  public taxiLocations = mockData;
  public center = officesLatLong.singapore;
  public map!: Leaflet.Map;
  public count = 10;
  private currentMarkers: Leaflet.Marker[] = [];
  private mouseAction = false;

  public options: Leaflet.MapOptions = {
    layers: getLayers(),
    zoom: 15,
    center: officesLatLong.singapore
  };

  public officeLocation = 'Singapore';

  public onToggleOffice(office: string) {
    this.center = officesLatLong[office];
    this.getTaxiLocations();
  }

  public onMapReady(event: Leaflet.Map) {
    this.map = event;
    this.getTaxiLocations()
    setInterval(() => this.getTaxiLocations(), 5000);
  }

  public onCountChanged(count: number) {
    this.count = count;
    this.getTaxiLocations();
  }

  private getTaxiLocations() {
    this.httpService.getNearby(this.center.lat, this.center.lng, this.count).toPromise().then((data) => {
      setTimeout(() => this.createTaxiMarker(data.drivers), 500)
    }).catch((err) => {
      console.error('error retrieving nearby drivers', err)
    });
  }

  public createTaxiMarker(drivers: any[]) {
    this.currentMarkers.forEach((markerlayer) => markerlayer.remove());
    this.currentMarkers = drivers.map(({ location }) => {
      return new Leaflet.Marker([location.latitude, location.longitude], {
        icon: Leaflet.icon({
          iconUrl: 'assets/taxi.svg',
          iconSize: [25, 41]
          })
      }).addTo(this.map)
    });
    let latBounds: Leaflet.LatLngTuple[];
    latBounds = drivers.map(({ location }) => { 
      return [location.latitude, location.longitude];
    })
    this.map.fitBounds(new Leaflet.LatLngBounds(latBounds))
  }
  
}


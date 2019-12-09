import { Component, AfterContentInit, ViewChild, OnInit,  } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {} from 'googlemaps';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{
  @ViewChild('map', {static: true}) mapElement: any;
  map: google.maps.Map;
  lon: any;
  lat: any;

  constructor(private geolocation: Geolocation) {

  }

  ngOnInit(): void {

    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lon = resp.coords.longitude;
      const mapProperties = {
        center: {lat:35.2271, lng:-80.8431},
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
      const pos = {
        lat: this.lat,
        lng: this.lon
      }
      this.map.setCenter(pos);
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    
  }
}

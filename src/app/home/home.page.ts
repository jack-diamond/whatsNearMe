import { Component, AfterContentInit, ViewChild, OnInit,  } from '@angular/core';
import {} from 'googlemaps';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{
  @ViewChild('map', {static: true}) mapElement: any;
  map: google.maps.Map;
  constructor() {

  }
  ngOnInit(): void {
    const mapProperties = {
      center: new google.maps.LatLng(35.2271, -80.8431),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
  }
}

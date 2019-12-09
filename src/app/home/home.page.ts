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
  places: Array<any>;

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
      
      this.getRestaurants().then((results: Array<any>) =>{
        this.places = results;
        for (let i = 0; i < results.length; i++) {
          this.createMarker(results[i]);
          
        }
      }, (status) => console.log(status));
      
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    


  }

  createMarker(place: { geometry: { location: any; }; }) {
    let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: place.geometry.location
    });   
  }  

  addMarker(){

    let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter()
    });

    let content = "<p>This is your current position !</p>";          
    let infoWindow = new google.maps.InfoWindow({
    content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
    });
  }

  getRestaurants(){
    var service = new google.maps.places.PlacesService(this.map);
    const pos = {
      lat: this.lat,
      lng: this.lon
    }
    let request = {
      location: pos,
      radius: 8047,
      types: ["restaurant"]
    };

    return new Promise((resolve,reject)=>{
      service.nearbySearch(request,function(results,status){
          if(status === google.maps.places.PlacesServiceStatus.OK)
          {
              resolve(results);    
          }else
          {
              reject(status);
          }

      }); 
  });
  }
}

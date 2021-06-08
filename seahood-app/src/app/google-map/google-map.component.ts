import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import {} from 'googlemaps';
// npm install --save @types/googlemaps
import { ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import ICrimeModel from '../interfaces/ICrimeModel';
import { SeahoodServiceService } from '../seahood-service.service';

export interface CrimeMarker {
  name: string;
  lat: number;
  long: number;
}

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css'],
})
export class GoogleMapComponent implements OnInit {
  @ViewChild('map') mapElement: any;
  map: any;
  myLat: number;
  myLong: number;
  zooming: number = 15;
  sh_service: SeahoodServiceService;
  crimes: ICrimeModel[] = [];
  markerData: CrimeMarker[] = [];
  markers: any[] = []; // Create a marker array to hold your markers
  myLatlng: any;
  defaultLat: number = 47.608013;
  defaultLong: number = -122.335167;

  geocoder: any;

  isDataAvailable: boolean = false;

  @Input() filter: any;

  constructor(
    private sh_serviceInput: SeahoodServiceService,
    private route: ActivatedRoute
  ) {
    this.sh_service = sh_serviceInput;

    this.myLat = this.defaultLat;
    this.myLong = this.defaultLong;
  }

  ngOnInit() {
    // this.initialize();
    this.sh_service.getAllCrimes().subscribe(
      (result) => {
        this.crimes = result;
        this.parseMapCrimeData();
      },
      () => { },
      () => { }
    );
  }

  setMarkers() {
    for (var i = 0; i < this.markerData.length; i++) {
      var mark = this.markerData[i];
      var myLatLng = new google.maps.LatLng(mark.lat, mark.long);
      let marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        animation: google.maps.Animation.DROP,
        title: mark.name,
      });
      let infowindow = new google.maps.InfoWindow({
        content: mark.name,
      });
      marker.addListener('click', () => {
        infowindow.open(this.map, marker);
      });
      marker.addListener('click', () => {
        this.map.setZoom(14);
        // this.map.setCenter(marker.getPosition() as google.maps.LatLng);
      });

      // Push marker to markers array
      this.markers.push(marker);
    }
  }

  reloadMarkers() {
    // Loop through markers and set map to null for each
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    // Reset the markers array
    this.markers = [];

    // Call set markers to re-add markers
    this.setMarkers();
  }

  initialize() {
    this.myLatlng = { lat: this.myLat, lng: this.myLong };

    this.map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        zoom: this.zooming,
        center: this.myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      }
    );

    const geocoder = new google.maps.Geocoder();
    (document.getElementById("submit") as HTMLButtonElement).addEventListener(
      "click", () => {
        this.geocodeAddress(geocoder, this.map);
      }
    );
    this.setMarkers();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.filter = changes.filter.currentValue;
    this.filter != undefined
      ? this.sh_service
        .getCrimeByFilter(
          this.filter[0],
          this.filter[1],
          this.filter[2],
          this.filter[3]
        )
        .subscribe(
          (result) => {
            console.log(result);
            this.crimes = result;
            this.parseMapCrimeData();
          },
          () => { },
          () => { }
        )
      : {};
    console.log(this.markerData);
  }

  parseMapCrimeData() {
    this.markerData = [];
    this.crimes.forEach((sample: any) => {
      this.markerData.push({
        name: sample.offense_parent_group,
        lat: sample.latitude,
        long: sample.longitude,
      });
    });
    if (this.markerData.length > 0) {
      this.myLat = this.markerData[0].lat;
      this.myLong = this.markerData[0].long;
      this.zooming = 10;
    } else {
      this.myLat = this.defaultLat;
      this.myLong = this.defaultLong;
    }
    this.initialize();
    this.reloadMarkers();
  }

  // Code to make address bar work
  geocodeAddress(
    geocoder: google.maps.Geocoder,
    resultsMap: google.maps.Map
  ) {

    const address = (document.getElementById("addressInput") as HTMLInputElement)
      .value;
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK") {

        //console.log(results)

        //this.markerData.push({
        //  name: "My Address",
        //  lat: results[0].geometry.location.lat(),
        //  long: results[0].geometry.location.lng(),
        //})
        //this.myLat = results[0].geometry.location.lat();
        //this.myLong = results[0].geometry.location.lng();

        //// call
        //this.reloadMarkers();

        const image =
          "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
        new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location,
          animation: google.maps.Animation.DROP,
          title: "My Address",
          icon: image,
        });

        resultsMap.setCenter(results[0].geometry.location);
        resultsMap.setZoom(13);

      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }
}

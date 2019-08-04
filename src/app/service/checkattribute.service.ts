import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


// use this for getting WMS from multiple layers, later
//import TileWMS from 'ol/source/TileWMS';

@Injectable({
  providedIn: 'root'
})
export class CheckattributeService {
  
  printURL(url) {
    return console.log(url);
  };

  getResponse(url){
    this.http.get(url)
    .subscribe(result => {
      //var resultProperties = result.features[0].properties;
      //console.log(resultProperties);
      console.log(result);
      //return resultProperties;
    },
    (err) => {console.log(err)});
  }

  constructor(private http: HttpClient) { }
}

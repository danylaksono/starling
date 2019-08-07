import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { LineString, Point } from 'ol/geom.js';
import { bbox as bboxStrategy } from 'ol/loadingstrategy';


@Injectable({
  providedIn: 'root'
})

export class CheckattributeService {


  returnedFeature: any[];
  needZoom: boolean = false;

  constructor(private http: HttpClient) { }

  private url = 'http://geoportal.ppids.ft.ugm.ac.id/geoserver/sitaru/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=sitaru%3Ajalan_gsb&outputFormat=application%2Fjson&srsName:EPSG:4326';
  private vectorSource;

  //closest jalan 
  private point: null;
  private line: null;
  displaySnap(coordinate) {
    var closestFeature = this.vectorSource.getClosestFeatureToCoordinate(coordinate);
    //console.log('closestFeature', closestFeature);
    var geometry = closestFeature.getGeometry();
    var closestPoint = geometry.getClosestPoint(coordinate);
    //console.log('closest point', closestPoint);
  };

  getResponse(url): Observable<any[]> {
    return this.http.get<any[]>(url)
      .pipe(
        map(res => res),
        tap(res => { res
          //console.log("users array", res);
        }
        )
      )

    //.subscribe(result => {
    //var resultProperties = result.features[0].properties;
    //console.log(resultProperties);
    //console.log(result);
    //return resultProperties;
    //},
    // (err) => { console.log(err) });
  };

  getJSONP() {
    //console.log("ssd");
    this.http.get(this.url)
      .subscribe((res) => {
        this.vectorSource = new VectorSource({
          features: (new GeoJSON).readFeatures(res)
        });
        //console.log(this.vectorSource.getGeometry());
        //console.log('vector source', this.vectorSource);
      });

  }

  getClosestFeature(coord) {
    var closestFeature = this.vectorSource.getClosestFeatureToCoordinate(coord);
    console.log(this.vectorSource.getFeatures());
    //console.log(closestFeature);
  }


  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(error);
    return throwError(error);
  }







}

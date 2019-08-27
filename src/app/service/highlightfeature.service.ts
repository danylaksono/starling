import { Injectable, ElementRef, ViewChild } from '@angular/core';
import Popup from 'ol-popup';
import { Fill, Stroke, Style } from 'ol/style';
import OlVectorSource from 'ol/source/Vector';
import OlVectorLayer from 'ol/layer/Vector';
import OlGeoJSON from 'ol/format/GeoJSON';

import { WarningSnackbarService } from './../dialog/warning-snackbar.service';
import { Overlay } from 'ol';

@Injectable({
  providedIn: 'root'
})
export class HighlightfeatureService {
  @ViewChild('popup', { static: false }) container: ElementRef;
  @ViewChild('popupcloser', { static: false }) closer: ElementRef;
  @ViewChild('popupcontent', { static: false }) content: ElementRef;

  popup: any;
  VectorLayer: OlVectorLayer;
  overlay: Overlay;

  constructor(
    private warning: WarningSnackbarService
  ) { }


  
  
  
  checkFeature(features, coordinate, map) {
    this.popup = new Popup();
    map.addOverlay(this.popup);

    /*

    this.overlay = new Overlay({
      element: this.container.nativeElement,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });

    this.closer.nativeElement.onclick = function() {
      this.overlay.setPosition(undefined);
      this.closer.blur();
      return false;
    };

    map.addOverlay(this.overlay);

    this.content.nativeElement.innerHTML = '<p>You clicked here:</p><code>'+'the hash slinging' +  '</code>';
    */

    
    
    var ketRDTR = features.features[0].properties;
    var ketBidang = features.features[1].properties;
    //console.log(features);

    if (features) {
      if (features.numberReturned > 2) {
        this.warning.open('Terpilih > 1 bidang tanah. Perbesar tampilan peta');
      } else if (features.numberReturned < 2) {
        this.warning.open('Data bidang tanah atau RDTR tidak tersedia');
      } else {       
        
        this.popup.show(coordinate, 
        '<h3>Bidang Tanah </h3>' + '<br>' +
        'Zona RDTR: '+  ketRDTR.zona +  '<br>' +
         'Tipe: ' + ketBidang.TIPE +  '<br>' +
         'Luas Bidang (m<sup>2</sup>): ' + ketBidang.luas + '<br>' +
         '<button mat-raised-button color="primary" (click)=check()> Cek Bidang Ini </button>'
          
          );
          
        //this.overlay.setPosition(coordinate);
        this.highlightSelected(features, map);
      }
    }
  }; //check feature


  highlightSelected(feature, map) {
    if (this.VectorLayer) {
      map.removeLayer(this.VectorLayer);
    }
    var geom = feature.features[1];
    var format = new OlGeoJSON({
      dataProjection: 'EPSG:3857',
      featureProjection: 'EPSG:3857',
      geometryName: 'the_geom'
    });
    var vectorSource = new OlVectorSource({
      features: format.readFeatures(geom)
    });
    var style = new Style({
      fill: new Fill({
        color: 'yellow'
      }),
      stroke: new Stroke({
        color: 'red',
        width: 2
      })
    });
    this.VectorLayer = new OlVectorLayer({
      source: vectorSource,
      style: style,
      renderMode: 'image',
      //@ts-ignore
      title: 'Bidang Tanah Terpilih',
      name: 'Selected'
      //map: this.map
    });
    map.addLayer(this.VectorLayer);
    map.render();
  } // highlight selected feature



}

import { LayerattributeComponent } from './../dialog/layerattribute/layerattribute.component';
import { Injectable, ElementRef, ViewChild } from '@angular/core';
//import Popup from 'ol-popup';
import { Fill, Stroke, Style } from 'ol/style';
import OlVectorSource from 'ol/source/Vector';
import OlVectorLayer from 'ol/layer/Vector';
import OlGeoJSON from 'ol/format/GeoJSON';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { WarningSnackbarService } from './../dialog/warning-snackbar.service';
import { Overlay } from 'ol';
import { MainqueryService } from './mainquery.service';


@Injectable({
  providedIn: 'root'
})

export class HighlightfeatureService {

  popup: any;
  VectorLayer: OlVectorLayer;
  overlay: Overlay;
  

  constructor(
    private warning: WarningSnackbarService,
    private query: MainqueryService,
    public dialog: MatDialog
  ) { }

 
  checkFeature(features, coordinate, map) {
    //this.popup = new Popup();
    //map.addOverlay(this.popup);

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
    //console.log(ketBidang);
    //console.log(ketRDTR);
    //console.log(coordinate);

    if (features) {
      if (features.numberReturned > 2) {
        this.warning.open('Terpilih > 1 bidang tanah. Perbesar tampilan peta');
      } else if (features.numberReturned < 2) {
        this.warning.open('Data bidang tanah atau RDTR tidak tersedia');
      } else {       
        this.openModalShowAttribute(ketRDTR, ketBidang);
         
        //this.overlay.setPosition(coordinate);
        this.highlightSelected(features, map);
      }
    }
  }; //check feature



  //======= clear selected highlight =======
  clearHighlight(map){
    if (this.VectorLayer) {
      map.removeLayer(this.VectorLayer);
    }
  }


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


  openModalShowAttribute(rdtr, bidang) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig = {
      disableClose : false,
      autoFocus : true,
      //height : '200px',
      width : '600px',
      hasBackdrop: false      
    }
    dialogConfig.data = {
      id: 2,
      title: 'Keterangan RDTR dan Bidang',
      dataRDTR: rdtr,
      dataBidang: bidang
      //article: 'Keluar dari Mode Administator?'

    };
    const dialogRef = this.dialog.open(LayerattributeComponent, dialogConfig);
    //dialogRef.closeAll();
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'A') {
        // handle A button close
        //console.log('A');
        this.query.openModalCekIzin(rdtr, bidang);
      }
    
      if (result === 'B') {
        // handle B button close
        //console.log('B');
      }

      //if (result) {
        //console.log(result);
        
        
      //}
    });
  } //opendialog

}

/*
const closedA$ = dialogRef.afterClosed().pipe(filter(result => result === 'A'));
const closedB$ = dialogRef.afterClosed().pipe(filter(result => result === 'B'));

closedA$.subscribe( // handle A);
closedB$.subscribe( // handle B);
*/
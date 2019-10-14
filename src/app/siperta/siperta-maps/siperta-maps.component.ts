

import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';


import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import { Fill, Stroke, Style } from 'ol/style';
import OlVectorSource from 'ol/source/Vector';
import OlVectorLayer from 'ol/layer/Vector';
import OlGeoJSON from 'ol/format/GeoJSON';
import TileWMS from 'ol/source/TileWMS';
import * as Control from 'ol/control';
import { Sidebar } from 'ol/control.js';
import SearchNominatim from 'ol-ext/control/SearchNominatim';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
import { fromLonLat } from 'ol/proj';

import { DialogAttributeComponent } from './../dialog/dialog-attribute/dialog-attribute.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { BasemaplayerService } from '../../service/basemaplayer.service';
import { SipertaoverlayService } from './../../service/sipertaoverlay.service';
import { CheckattributeService } from '../../service/checkattribute.service';




@Component({
  selector: 'app-siperta-maps',
  templateUrl: './siperta-maps.component.html',
  styleUrls: ['./siperta-maps.component.scss']
})
export class SipertaMapsComponent implements OnInit {

  map: OlMap;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView;
  wmsSource: TileWMS;
  VectorLayer: OlVectorLayer;

  basemap: any[];
  overlay: {};
  list: any[];
  clickedfeature: any[];
  panelOpenState2 = false;

  @ViewChild('switcher2', { static: false }) switcher2: ElementRef;

  constructor(
    public basemaplayers: BasemaplayerService,
    public overlaylayers: SipertaoverlayService,
    private checkattribute: CheckattributeService,
    public dialog: MatDialog
    
  ) { }

  ngOnInit() {

    // for get featureinfo
    this.wmsSource = new TileWMS({
      url: 'https://geoserver.jogjakota.go.id/geoserver/siperta/wms',
      params: {
        'LAYERS': 'siperta:LAHAN_PEMKOT_YOGYAKARTA',
        'FORMAT': 'image/png8',
        'TILED': false,
        'VERSION': '1.1.1',
      },
      serverType: 'geoserver',
      crossOrigin: 'anonymous'
    });


    this.view = new OlView({
      center: fromLonLat([110.3650042, -7.8049497]),
      zoom: 16,
      //projection: 'EPSG:4326'
    });

    // --map definitions --
    this.map = new OlMap({
      target: 'sipertamap',
      controls: Control.defaults({
        rotate: false,
        zoom: true
      }),
      layers: [
        this.basemaplayers.basemap,
        this.overlaylayers.overlay
      ],
      view: this.view
    });

    var sidebar = new Sidebar({ element: 'sidebar', position: 'right' });
    var scale = new Control.ScaleLine;
    this.map.addControl(sidebar);
    this.map.addControl(scale);


  } //oninit


  ngAfterViewInit() {
    // for ol to work: set target in afterviewinit
    this.map.setTarget('sipertamap');

    var toc = this.switcher2.nativeElement; // getting switcher DOM    
    //LayerSwitcher.renderPanel(this.map, toc); // should be located in ngAfterViewInit instead of onInit

    // Add a layer switcher outside the map
    var switcher = new LayerSwitcher(
      {
        target: toc,
        show_progress: true,
        extent: true

      });
    this.map.addControl(switcher);

    this.map.on('click', (evt) => {
      //console.log('cl')

      var viewResolution = /** @type {number} */ (this.view.getResolution());
      var url = this.wmsSource.getGetFeatureInfoUrl(
        evt.coordinate, viewResolution, this.view.getProjection(),//'EPSG:3857',
        {
          'INFO_FORMAT': 'application/json',
          'QUERY_LAYERS': 'siperta:LAHAN_PEMKOT_YOGYAKARTA',
          'FEATURE_COUNT': 1
        });

      // getting GetFeatureInfo data
      this.checkattribute.getResponse(url).subscribe(
        res => {
          this.clickedfeature = res;
          //this.checkFeature(this.clickedfeature, evt.coordinate);
          //console.log(this.clickedfeature);
          this.highlightSelected(this.clickedfeature, this.map);
          this.openModalShowAttribute(this.clickedfeature);
        }
      );
    });
  } //afterview


  highlightSelected(feature, map) {
    if (this.VectorLayer) {
      map.removeLayer(this.VectorLayer);
    }
    var geom = feature.features[0];
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
      title: 'Aset Terpilih',
      name: 'Selected'
      //map: this.map
    });
    map.addLayer(this.VectorLayer);
    map.render();
  } // highlight selected feature


  //======= clear selected highlight =======
  clearSelected(){
    if (this.VectorLayer) {
      this.map.removeLayer(this.VectorLayer);
    }
  } // clear selection


  //=========== open attribute ===========
  
  openModalShowAttribute(data) {
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
      title: 'Keterangan Aset',
      atribut: data

    };
    const dialogRef = this.dialog.open(DialogAttributeComponent, dialogConfig);
    //dialogRef.closeAll();
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'A') {
        // handle A button close
        console.log('A');
        //this.query.openModalCekIzin(rdtr, bidang);
      }
    
      if (result === 'B') {
        // handle B button close
        console.log('B');
      }

      //if (result) {
        //console.log(result);
        
        
      //}
    });
  } //opendialog



}

import { Component, OnInit, NgZone, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import OlVectorLayer from 'ol/layer/Vector';
import TileWMS from 'ol/source/TileWMS';
import * as Control from 'ol/control';
import { Sidebar } from 'ol/control.js';
import SearchNominatim from 'ol-ext/control/SearchNominatim';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
import { fromLonLat } from 'ol/proj';




//components
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CekizinComponent } from './../dialog/cekizin/cekizin.component';
import { BasemaplayerService } from '../service/basemaplayer.service';
import { OverlaylayerService } from './../service/overlaylayer.service';
import { CheckattributeService } from './../service/checkattribute.service';
import { DataitbxService } from './../service/dataitbx.service';
import { DaftarkegiatanService } from '../service/daftarkegiatan.service';
import { WarningSnackbarService } from './../dialog/warning-snackbar.service';
import { HighlightfeatureService } from '../service/highlightfeature.service'
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})


export class MapsComponent implements OnInit, AfterViewInit {

  map: OlMap;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView;
  wmsSource: TileWMS;
  VectorLayer: OlVectorLayer;
  loggedIn: Boolean = false;

  basemap: any[];
  overlay: {};
  list: any[];
  clickedfeature: any[];


  @ViewChild('switcher', { static: false }) switcher: ElementRef;

  constructor(
    public basemaplayers: BasemaplayerService,
    private overlaylayers: OverlaylayerService,
    private checkattribute: CheckattributeService,
    private dataitbx: DataitbxService,
    private daftarkegiatan: DaftarkegiatanService,
    private dialog: MatDialog,
    private hightlight: HighlightfeatureService,
    private warning: WarningSnackbarService,
    private cookie: CookieService
  ) {
  } // constructor



  ngOnInit() {

    //getting itbx data
    //console.log(this.dataitbx.getITBX());
    this.daftarkegiatan.getKegiatan().subscribe(
      res => {
        this.list = res;
        //console.log(this.list);
      }
    );


    //getting gsb data
    //this.checkattribute.getJSONP();

    // for get featureinfo
    this.wmsSource = new TileWMS({
      url: 'http://peta.jogjakota.go.id:8080/geoserver/sitaru/wms',
      params: {
        'LAYERS': 'sitaru:sitaru2',
        'FORMAT': 'image/png8',
        'TILED': false,
        'VERSION': '1.1.1',
      },
      serverType: 'geoserver',
      crossOrigin: 'anonymous'
    });

    this.view = new OlView({
      center: fromLonLat([110.3650042, -7.8049497]),
      zoom: 17,
      //projection: 'EPSG:4326'
    });

    // --map definitions --
    this.map = new OlMap({
      target: 'map',
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


    // map sidebar
    var sidebar = new Sidebar({ element: 'sidebar', position: 'right' });
    var scale = new Control.ScaleLine;
    this.map.addControl(sidebar);
    this.map.addControl(scale);


    // Search control
    const search = new SearchNominatim();
    // Move to the position on selection in the control list
    search.on('select', (e) => {
      // console.log(e);
      this.map.getView().animate({
        center: e.coordinate,
        zoom: Math.max(this.map.getView().getZoom(), 16)
      });
    });
    this.map.addControl(search);




  } // oninint

  ngAfterViewInit() {
    // for ol to work: set target in afterviewinit
    this.map.setTarget('map');

    var toc = this.switcher.nativeElement; // getting switcher DOM    
    //LayerSwitcher.renderPanel(this.map, toc); // should be located in ngAfterViewInit instead of onInit

    // Add a layer switcher outside the map
    var switcher = new LayerSwitcher(
      {
        target: toc,
        show_progress: true,
        extent: true

      });
    this.map.addControl(switcher);


    // =========MAIN EVENT ONCLICK================
    this.map.on('click', (evt) => {
      // test call modal
      //this.openModal(this.list);

      var viewResolution = /** @type {number} */ (this.view.getResolution());
      var url = this.wmsSource.getGetFeatureInfoUrl(
        evt.coordinate, viewResolution, this.view.getProjection(),//'EPSG:3857',
        {
          'INFO_FORMAT': 'application/json',
          'QUERY_LAYERS': 'sitaru:pola_ruang_rdtr, sitaru:bidang_tanah_tujuh_edit',
          'FEATURE_COUNT': 5
        });

      // getting GetFeatureInfo data
      this.checkattribute.getResponse(url).subscribe(
        res => {
          this.clickedfeature = res;
          //this.checkFeature(this.clickedfeature, evt.coordinate);
          this.hightlight.checkFeature(this.clickedfeature, evt.coordinate, this.map);
          
        }
      );

      //this.checkattribute.getClosestFeature(evt.coordinate);
      //this.checkattribute.displaySnap(evt.coordinate);

      //console.log(res.features);

    });  //==onclick

    /*
    this.map.on('pointermove', (evt) => {
      if (evt.dragging) {
        return;
      }
      var pixel = this.map.;getEventPixel(evt.originalEvent);
      var hit = this.map.forEachLayerAtPixel(pixel, function () {
        return true;
      });
      this.map.getTargetElement().style.cursor = hit ? 'pointer' : '';

    });
    */

  } // afterview init


  openModal(list) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: 'Jenis Kegiatan',
      article: 'the article',
      list: list
    };
    const dialogRef = this.dialog.open(CekizinComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog closed")
      console.log(result)
    });
  }





  /*
  checkFeature(features, coordinate) {
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
        this.highlightSelected(this.clickedfeature);
      }
    }
  }; //check feature


  highlightSelected(feature) {
    if (this.VectorLayer) {
      this.map.removeLayer(this.VectorLayer);
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
    this.map.addLayer(this.VectorLayer);
    this.map.render();
  } // highlight selected feature

  check(){
    console.log("check");
  }

  */

}

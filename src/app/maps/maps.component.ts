


import { Component, OnInit, NgZone, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import TileWMS from 'ol/source/TileWMS';
import * as Control from 'ol/Control';
import { Sidebar } from 'ol/control.js';
import SearchNominatim from 'ol-ext/control/SearchNominatim';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
import { fromLonLat } from 'ol/proj';
import Popup from 'ol-popup';

//dialog components
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CekizinComponent } from './../dialog/cekizin/cekizin.component';

import { BasemaplayerService } from '../service/basemaplayer.service';
import { OverlaylayerService } from './../service/overlaylayer.service';
import { CheckattributeService } from './../service/checkattribute.service';
import { DataitbxService } from './../service/dataitbx.service';
import { DaftarkegiatanService } from '../service/daftarkegiatan.service';
import { WarningSnackbarService } from './../dialog/warning-snackbar.service';


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
  basemap: any[];
  overlay: {};
  list: any[];
  popup: any;
  clickedfeature: any[];


  @ViewChild('switcher', { static: false }) switcher: ElementRef;

  constructor(
    public basemaplayers: BasemaplayerService,
    private overlaylayers: OverlaylayerService,
    private checkattribute: CheckattributeService,
    private dataitbx: DataitbxService,
    private daftarkegiatan: DaftarkegiatanService,
    private dialog: MatDialog,
    private warning: WarningSnackbarService
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
    this.checkattribute.getJSONP();

    // for get featureinfo
    this.wmsSource = new TileWMS({
      url: 'http://geoportal.ppids.ft.ugm.ac.id/geoserver/sitaru/wms',
      params: {
        'LAYERS': 'sitaru:sitaru2',
        'TILED': true,
        'VERSION': '1.1.1',
      },
      serverType: 'geoserver',
      crossOrigin: 'anonymous'
    });

    this.view = new OlView({
      center: fromLonLat([110.3738942, -7.8049497]),
      zoom: 14
    });

    this.layer = new OlTileLayer({
      source: this.source
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

    //popup
    this.popup = new Popup();
    this.map.addOverlay(this.popup);

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
    this.map.on('singleclick', (evt) => {
      // TODO: add check zoom function to ensure only two layers were selected

      

      // test call modal
      //this.openModal(this.list);
      //console.log(this.list);

      var viewResolution = /** @type {number} */ (this.view.getResolution());
      var url = this.wmsSource.getGetFeatureInfoUrl(
        evt.coordinate, viewResolution, 'EPSG:3857',
        {
          'INFO_FORMAT': 'application/json',
          'QUERY_LAYERS': 'sitaru:pola_ruang_rdtr, sitaru:bidang_tanah_tujuh_edit',
          'FEATURE_COUNT': 5
        });
      
      // getting GetFeatureInfo data
      this.checkattribute.getResponse(url).subscribe(
        res => {
          this.clickedfeature = res;
        }
      );

      // more than two features: no query
      if (this.clickedfeature.numberReturned > 2) {
        this.warning.open('Terpilih > 1 bidang tanah. Zoom untuk mengulang');
        
      } else {
        console.log(this.clickedfeature);
        this.popup.show(evt.coordinate, this.clickedfeature.features[0].id + '<br/>'+ this.clickedfeature.features[1].id );
      }

      
      
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


}


import { Component, OnInit, Inject, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

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

import { BasemaplayerService } from '../service/basemaplayer.service';
import { OverlaylayerService } from './../service/overlaylayer.service';
import { CheckattributeService } from './../service/checkattribute.service';



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

  @ViewChild('switcher', { static: false }) switcher: ElementRef;

  constructor(
    public basemaplayers: BasemaplayerService,
    private overlaylayers: OverlaylayerService,
    private checkattribute: CheckattributeService
  ) {
  } // constructor




  getOverlays() {
    this.overlay = this.overlaylayers.overlayServgices();
    return this.basemap;
  };


  ngOnInit() {

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

    // map definitions
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


    // sidebar
    var sidebar = new Sidebar({ element: 'sidebar', position: 'right' });
    var scale = new Control.ScaleLine;

    this.map.addControl(sidebar);
    this.map.addControl(scale);


    // Search control
    const search = new SearchNominatim();
    // Move to the position on selection in the control list
    search.on('select', function (e) {
      // console.log(e);
      this.map.getView().animate({
        center: e.coordinate,
        zoom: Math.max(this.map.getView().getZoom(), 16)
      });
    });
    this.map.addControl(search);


  } // oninint

  ngAfterViewInit() {
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

    this.map.on('singleclick', (evt) => {
      //console.log(this.view.getResolution());
      var viewResolution = /** @type {number} */ (this.view.getResolution());
      var url = this.wmsSource.getGetFeatureInfoUrl(
        evt.coordinate, viewResolution, 'EPSG:3857',
        { 
          'INFO_FORMAT': 'application/json',
          'QUERY_LAYERS': 'sitaru:pola_ruang_rdtr, sitaru:bidang_tanah_tujuh_edit',
          'FEATURE_COUNT': 50
      
      });
      //console.log(url);
      //this.checkattribute.printURL(url);
      this.checkattribute.getResponse(url);
        //console.log(res.features);

    });

    /*
    this.map.on('pointermove', (evt) => {
      if (evt.dragging) {
        return;
      }
      var pixel = this.map.getEventPixel(evt.originalEvent);
      var hit = this.map.forEachLayerAtPixel(pixel, function () {
        return true;
      });
      this.map.getTargetElement().style.cursor = hit ? 'pointer' : '';

    });
    */

  } // afterview init



}

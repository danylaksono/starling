
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';


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


import { BasemaplayerService } from '../../service/basemaplayer.service';
import { SipertaoverlayService } from './../../service/sipertaoverlay.service';

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

  @ViewChild('switcher2', { static: false }) switcher2: ElementRef;

  constructor(
    public basemaplayers: BasemaplayerService,
    public overlaylayers: SipertaoverlayService,

  ) { }

  ngOnInit() {

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
  }



}

import { Component, OnInit, AfterViewInit, Input } from '@angular/core';

import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import * as Control from 'ol/Control';

//import LayerSwitcher from 'ol-layerswitcher';

import { fromLonLat } from 'ol/proj'

declare var ol: any;


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
  ol: any;

  constructor() {
    

   } // constructor

  ngOnInit() {
    this.source = new OlXYZ({
      url: 'http://tile.osm.org/{z}/{x}/{y}.png'
    });



    this.layer = new OlTileLayer({
      source: this.source
    });

    this.view = new OlView({
      center: fromLonLat([110.3738942, -7.8049497]),
      zoom: 13
    });

    this.map = new OlMap({
      target: 'map',
      controls: Control.defaults({
        rotate: false,
        zoom: true
      }),
      layers: [this.layer],
      view: this.view
    });

  
  
  }

  ngAfterViewInit() {
    this.map.setTarget('map');
  }

}

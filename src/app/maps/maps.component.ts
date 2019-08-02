
import { Component, OnInit, Inject, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import * as Control from 'ol/Control';
import { Sidebar } from 'ol/control.js';
import SearchNominatim from 'ol-ext/control/SearchNominatim';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
import { fromLonLat } from 'ol/proj';

import {BasemaplayerService } from '../service/basemaplayer.service';
import { OverlaylayerService } from './../service/overlaylayer.service';




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
  basemap:any[];
  overlay:{};
  
  @ViewChild('switcher', { static: false }) switcher: ElementRef;

  constructor(
    public basemaplayers: BasemaplayerService,
    private overlaylayers: OverlaylayerService
    ) {
  } // constructor

  

  
  getOverlays(){
    this.overlay = this.overlaylayers.overlayServgices(); 
    return this.basemap;
  };
    

  ngOnInit() {
 
    this.view = new OlView({
      center: fromLonLat([110.3738942, -7.8049497]),
      zoom: 13
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
        show_progress:true,
        extent: true

      });
    this.map.addControl(switcher);



  } // afterview init

}

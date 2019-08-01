
import { Component, OnInit, Inject, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import * as Control from 'ol/Control';
import { Sidebar } from 'ol/control.js';

import LayerGroup from 'ol/layer/Group';
import LayerImage from 'ol/layer/Image';
import LayerTile from 'ol/layer/Tile';
import SourceImageArcGISRest from 'ol/source/ImageArcGISRest';
import SourceOSM from 'ol/source/OSM';
import SourceStamen from 'ol/source/Stamen';
import LayerSwitcher from 'ol-layerswitcher';


import { fromLonLat } from 'ol/proj'




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
  @ViewChild('switcher', { static: false }) switcher: ElementRef;

  constructor() {
  } // constructor

  ngOnInit() {
    this.source = new OlXYZ({
      url: 'http://tile.osm.org/{z}/{x}/{y}.png'
    });
    this.layer = new OlTileLayer({
      title: 'OpenStreetMap',
      source: this.source

    });
    this.view = new OlView({
      center: fromLonLat([110.3738942, -7.8049497]),
      zoom: 13
    });

    // map definitions
    this.map = new OlMap({
      target: 'map',
      controls: Control.defaults({
        rotate: false,
        zoom: true
      }),
      //layers: [this.layer],
      layers: [
        new LayerGroup({
          'title': 'Base maps',
          layers: [
            new LayerGroup({
              title: 'Water color with labels',
              type: 'base',
              combine: true,
              visible: false,
              layers: [
                new LayerTile({
                  source: new SourceStamen({
                    layer: 'watercolor'
                  })
                }),
                new LayerTile({
                  source: new SourceStamen({
                    layer: 'terrain-labels'
                  })
                })
              ]
            }),
            new LayerTile({
              title: 'Water color',
              type: 'base',
              visible: false,
              source: new SourceStamen({
                layer: 'watercolor'
              })
            }),
            new LayerTile({
              title: 'OSM',
              type: 'base',
              visible: true,
              source: new SourceOSM()
            })
          ]
        }),
        new LayerGroup({
          title: 'Overlays',
          layers: [
            new LayerImage({
              title: 'Countries',
              source: new SourceImageArcGISRest({
                ratio: 1,
                params: { 'LAYERS': 'show:0' },
                url: "https://ons-inspire.esriuk.com/arcgis/rest/services/Administrative_Boundaries/Countries_December_2016_Boundaries/MapServer"
              })
            })
          ]
        })
      ],
      view: this.view
    });


    // sidebar
    var sidebar = new Sidebar({ element: 'sidebar', position: 'right' });
    var scale = new Control.ScaleLine;

    this.map.addControl(sidebar);
    this.map.addControl(scale);



  } // oninint

  ngAfterViewInit() {
    this.map.setTarget('map');
    var toc = this.switcher.nativeElement; // getting switcher DOM    
    LayerSwitcher.renderPanel(this.map, toc); // should be located here 
  } // afterview init

}

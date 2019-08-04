import { Injectable } from '@angular/core';
import LayerGroup from 'ol/layer/Group';
import LayerTile from 'ol/layer/Tile';
import SourceOSM from 'ol/source/OSM';
import SourceStamen from 'ol/source/Stamen';

@Injectable({
  providedIn: 'root'
})

export class BasemaplayerService {
  public basemap = new LayerGroup({
    //@ts-ignore
    title:"Layer Dasar",
    openInLayerSwitcher: true,
    layers: [
      new LayerTile({
        //@ts-ignore
        title: 'Water color',
        baseLayer: true,
        visible: false,
        source: new SourceStamen({
          layer: 'watercolor'
        })
      }),
      new LayerTile({
        //@ts-ignore
        title: 'OpenStreetMap (OSM)',
        baseLayer:true,
        visible: true,
        source: new SourceOSM()
      })
    ]
  });

  basemapServices() {
    return this.basemap;
  };


  constructor() { }
}



/*
new LayerGroup({
        title: 'Water color with labels',
        type: 'base',
        combine: true,
        visible: false,
        layers: [
          new LayerTile({
            title:'watercolor',
            source: new SourceStamen({
              layer: 'watercolor'
            }),
            baseLayer: true
          }),
          new LayerTile({
            title:'terrain-labels',
            source: new SourceStamen({
              layer: 'terrain-labels'
            }),
            baseLayer: true
          })
        ]
      }),
*/
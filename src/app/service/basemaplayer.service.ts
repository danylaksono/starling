import { Injectable } from '@angular/core';
import LayerGroup from 'ol/layer/Group';
import LayerTile from 'ol/layer/Tile';
import SourceOSM from 'ol/source/OSM';
import SourceStamen from 'ol/source/Stamen';
import XYZ from 'ol/source/XYZ';

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
        visible: false,
        //projection: 'EPSG:3857',
        preload: Infinity,
        source: new SourceOSM()
      }),
      new LayerTile({
        //@ts-ignore
        title: 'ESRI World Imagery',
        baseLayer:true,
        visible: false,
        preload: Infinity,
        source: new XYZ({
          //@ts-ignore
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          attributions: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        })
      }),
      new LayerTile({
        //@ts-ignore
        title: 'Google Terrain',
        baseLayer:true,
        visible: false,
        preload: Infinity,
        
        source: new XYZ({
          //@ts-ignore
          url: 'http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}',
          //https://www.maptiler.com/google-maps-coordinates-tile-bounds-projection/
          //@ts-ignore
          transparent: true,
          //@ts-ignore
          wrapx: false
        })
      }),
      new LayerTile({
        //@ts-ignore
        title: 'Google Roadmap',
        baseLayer:true,
        visible: false,
        preload: Infinity,
        
        source: new XYZ({
          //@ts-ignore
          url: 'http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}',
          //https://www.maptiler.com/google-maps-coordinates-tile-bounds-projection/
          //@ts-ignore
          transparent: true,
          //@ts-ignore
          wrapx: false
        })
      }),
      new LayerTile({
        //@ts-ignore
        title: 'Google Hybrid',
        baseLayer:true,
        visible: false,
        preload: Infinity,
        
        source: new XYZ({
          //@ts-ignore
          url: 'http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}',
          //https://www.maptiler.com/google-maps-coordinates-tile-bounds-projection/
          //@ts-ignore
          transparent: true,
          //@ts-ignore
          wrapx: false
        })
      }),
      new LayerTile({
        //@ts-ignore
        title: 'Google Satellite',
        baseLayer:true,
        visible: true,
        preload: Infinity,
        
        source: new XYZ({
          //@ts-ignore
          url: 'http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}',
          //https://www.maptiler.com/google-maps-coordinates-tile-bounds-projection/
          //@ts-ignore
          transparent: true,
          //@ts-ignore
          wrapx: false
        })
      }),
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
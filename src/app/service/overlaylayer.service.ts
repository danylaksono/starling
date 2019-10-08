import { Injectable } from '@angular/core';
import LayerGroup from 'ol/layer/Group';
import LayerTile from 'ol/layer/Tile';
import SourceWMS from 'ol/source/TileWMS';


@Injectable({
  providedIn: 'root'
})


export class OverlaylayerService {


  //linkGeoserver: string = 'http://geoportal.ppids.ft.ugm.ac.id/geoserver/sitaru/wms';
  linkGeoserver: string = 'https://geoserver.jogjakota.go.id/geoserver/sitaru/wms';

  

  public overlay =  new LayerGroup({
    //@ts-ignore
    title: 'Layer Peta',
    openInLayerSwitcher: true,
    layers: [
      new LayerTile({
        //@ts-ignore
        title: 'Bidang Tanah',       
        visible: true,
        opacity: 0.6,
        preload: Infinity,
        source: new SourceWMS({
          url: this.linkGeoserver, 
          params: {'LAYERS': 'sitaru:bidang_tanah_tujuh_edit', 'TILED': true},
          serverType: 'geoserver',
          transition: 0
          
        })
      }),
      new LayerTile({
        //@ts-ignore
        title: 'Rencana Detil Tata Ruang',       
        visible: false,
        opacity: 0.7,
        source: new SourceWMS({
          url: this.linkGeoserver, 
          params: {'LAYERS': 'sitaru:pola_ruang_rdtr', 'TILED': true},
          serverType: 'geoserver',
          transition: 0
        })
      }),
      new LayerTile({
        //@ts-ignore
        title: 'Jaringan Jalan',       
        visible: true,
        source: new SourceWMS({
          url: this.linkGeoserver, 
          //params: {'LAYERS': 'sitaru:jalan_gsb', 'TILED': true},
          params: {'LAYERS': 'sitaru:jalan_gsb', 'TILED': true},
          serverType: 'geoserver',
          transition: 0
        })
      })
    ]
  });


  overlayServgices(){
    return this.overlay;
  }

  constructor() { }
}

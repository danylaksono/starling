import { Injectable } from '@angular/core';
import LayerGroup from 'ol/layer/Group';
import LayerTile from 'ol/layer/Tile';
import SourceWMS from 'ol/source/TileWMS';
import SourceOSM from 'ol/source/OSM';


@Injectable({
  providedIn: 'root'
})

export class SipertaoverlayService {

  linkGeoserver: string = 'http://geoportal.ppids.ft.ugm.ac.id/geoserver/siperta/wms';

  public overlay =  new LayerGroup({
    //@ts-ignore
    title: 'Layer Peta',
    openInLayerSwitcher: true,
    layers: [
      new LayerTile({
        //@ts-ignore
        title: 'Jaringan Jalan',       
        visible: true,
        source: new SourceWMS({
          url: 'https://geoserver.jogjakota.go.id/geoserver/sitaru/wms',
          params: {'LAYERS': 'sitaru:jalan_gsb'},
          serverType: 'geoserver'
        })
      }),
      new LayerTile({
        //@ts-ignore
        title: 'Lahan Pemkot',       
        visible: true,
        source: new SourceWMS({
          url: this.linkGeoserver,
          params: {'LAYERS': 'siperta:LAHAN_PEMKOT_YOGYAKARTA'},
          serverType: 'geoserver'
          
        })
      })
    ]
  });

  constructor() { }
}

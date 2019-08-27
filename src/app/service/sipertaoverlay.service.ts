import { Injectable } from '@angular/core';
import LayerGroup from 'ol/layer/Group';
import LayerTile from 'ol/layer/Tile';
import SourceWMS from 'ol/source/TileWMS';
import SourceOSM from 'ol/source/OSM';


@Injectable({
  providedIn: 'root'
})
export class SipertaoverlayService {


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
          url: 'http://geoportal.ppids.ft.ugm.ac.id/geoserver/sitaru/wms',
          params: {'LAYERS': 'sitaru:jalan_gsb', 'TILED': true},
          serverType: 'geoserver',
          transition: 0
        })
      }),
      new LayerTile({
        //@ts-ignore
        title: 'Lahan Pemkot',       
        visible: true,
        source: new SourceWMS({
          url: 'http://localhost:8080/geoserver/siperta/wms',
          params: {'LAYERS': 'siperta:LAHAN_PEMKOT_YOGYAKARTA', 'TILED': true},
          serverType: 'geoserver',
          transition: 0
        })
      })
    ]
  });

  constructor() { }
}

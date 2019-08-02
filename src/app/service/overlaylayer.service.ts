import { Injectable } from '@angular/core';
import LayerGroup from 'ol/layer/Group';
import LayerTile from 'ol/layer/Tile';
import SourceWMS from 'ol/source/TileWMS';
import SourceOSM from 'ol/source/OSM';


@Injectable({
  providedIn: 'root'
})
export class OverlaylayerService {
  public overlay =  new LayerGroup({
    title: 'Layer Peta',
    openInLayerSwitcher: true,
    layers: [
      new LayerTile({
        title: 'Rencana Detil Tata Ruang',       
        visible: true,
        source: new SourceWMS({
          url: 'http://gis.jogjaprov.go.id:8080/geoserver/geonode/wms',
          params: {'LAYERS': 'geonode:pola_ruang_rdtr_kota_jogja', 'TILED': true},
          serverType: 'geoserver',
          transition: 0
        })
      }),
      new LayerTile({
        title: 'OSM',       
        visible: false,
        source: new SourceOSM()
      })
    ]
  });


  overlayServgices(){
    return this.overlay;
  }

  constructor() { }
}

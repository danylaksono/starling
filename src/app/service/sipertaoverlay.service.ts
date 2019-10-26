import { Injectable } from '@angular/core';
import LayerGroup from 'ol/layer/Group';
import LayerTile from 'ol/layer/Tile';
import SourceWMS from 'ol/source/TileWMS';
import SourceOSM from 'ol/source/OSM';


@Injectable({
  providedIn: 'root'
})

export class SipertaoverlayService {

  linkGeoserver: string = 'https://geoserver.jogjakota.go.id/geoserver/siperta/wms';

  public overlay =  new LayerGroup({
    //@ts-ignore
    title: 'Layer Peta',
    openInLayerSwitcher: true,
    layers: [
      new LayerTile({
        //@ts-ignore
        title: 'Bidang Tanah',       
        visible: false,
        opacity: 0.6,
        preload: Infinity,
        source: new SourceWMS({
          url: 'https://geoserver.jogjakota.go.id/geoserver/sitaru/wms',
          params: {'LAYERS': 'sitaru:bidang_tanah_tujuh_edit', 'TILED': true},
          serverType: 'geoserver',
          transition: 0
        })
      }),
      new LayerTile({
        //@ts-ignore
        title: 'Jaringan Jalan',       
        visible: true,
        preload: Infinity,
        source: new SourceWMS({
          url: 'https://geoserver.jogjakota.go.id/geoserver/sitaru/wms',
          params: {'LAYERS': 'sitaru:jalan_gsb'},
          serverType: 'geoserver',
          transition: 0
        })
      }),
      new LayerTile({
        //@ts-ignore
        title: 'Rencana Detil Tata Ruang',       
        visible: true,
        preload: Infinity,
        source: new SourceWMS({
          url: 'https://geoserver.jogjakota.go.id/geoserver/sitaru/wms',
          params: {'LAYERS': 'sitaru:pola_ruang_rdtr'},
          serverType: 'geoserver',
          transition: 0
        })
      }),
      new LayerTile({
        //@ts-ignore
        title: 'Lahan Pemkot',       
        visible: true,
        preload: Infinity,
        source: new SourceWMS({
          url: this.linkGeoserver,
          params: {'LAYERS': 'siperta:LAHAN_PEMKOT_YOGYAKARTA'},
          serverType: 'geoserver',
          transition: 0          
        })
      }),
      new LayerTile({
        //@ts-ignore
        title: 'Bank Tanah',       
        visible: true,
        preload: Infinity,
        source: new SourceWMS({
          url: 'https://geoserver.jogjakota.go.id/geoserver/sitaru/wms',
          params: {'LAYERS': 'sitaru:banktanah', 'TILED': true},
          serverType: 'geoserver',
          transition: 0
        })
      })
    ]
  });

  constructor() { }
}

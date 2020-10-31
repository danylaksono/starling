import { Component, OnInit, NgZone, AfterViewInit, ElementRef, ViewChild, Directive } from '@angular/core';

import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import * as Extent from 'ol/Extent';
import OlVectorLayer from 'ol/layer/Vector';
import TileWMS from 'ol/source/TileWMS';
import * as Control from 'ol/control';
import { Sidebar } from 'ol/control.js';
import SearchNominatim from 'ol-ext/control/SearchNominatim';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
import { fromLonLat } from 'ol/proj';
import OlGeoJSON from 'ol/format/GeoJSON';
import { Fill, Circle, Stroke, Style } from 'ol/style';
import OlVectorSource from 'ol/source/Vector';


//components & services
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CekizinComponent } from './../dialog/cekizin/cekizin.component';
import { BasemaplayerService } from '../service/basemaplayer.service';
import { OverlaylayerService } from './../service/overlaylayer.service';
import { CheckattributeService } from './../service/checkattribute.service';
import { DataitbxService } from './../service/dataitbx.service';
import { DaftarkegiatanService } from '../service/daftarkegiatan.service';
import { WarningSnackbarService } from './../dialog/warning-snackbar.service';
import { HighlightfeatureService } from '../service/highlightfeature.service'
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './../service/auth.service';
import { Observable } from "rxjs";



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
  wmsSource: TileWMS;
  VectorLayer: OlVectorLayer;
  sLayer: OlVectorLayer;

  linkServer: string = 'https://geoserver.jogjakota.go.id/geoserver/';
  linkWMS: string = this.linkServer + 'sitaru/wms';


  //isLoggedIn: Boolean = false;

  isLoggedIn: Observable<boolean>;
  panelOpenState1 = false;
  panelOpenState2 = false;

  basemap: any[];
  overlay: {};
  list: any[];
  clickedfeature: any[];

  @ViewChild('switcher', { static: false }) switcher: ElementRef;


  

  constructor(
    public basemaplayers: BasemaplayerService,
    private overlaylayers: OverlaylayerService,
    private checkattribute: CheckattributeService,
    private dataitbx: DataitbxService,
    private daftarkegiatan: DaftarkegiatanService,
    private dialog: MatDialog,
    private hightlight: HighlightfeatureService,
    private warning: WarningSnackbarService,
    private cookie: CookieService,
    private auth: AuthService
  ) {
    this.isLoggedIn = auth.isLoggedIn();
  } // constructor



  ngOnInit() {
    //getting itbx data
    //console.log(this.dataitbx.getITBX());
    this.daftarkegiatan.getKegiatan().subscribe(
      res => {
        this.list = res;
        //console.log(this.list);
      }
    );


    //getting gsb data
    //this.checkattribute.getJSONP();

    // for get featureinfo
    this.wmsSource = new TileWMS({
      url: this.linkWMS,
      params: {
        'LAYERS': 'sitaru:sitaru2',
        'FORMAT': 'image/png8',
        'TILED': true,
        'VERSION': '1.1.1',
      },
      serverType: 'geoserver',
      crossOrigin: 'anonymous'
    });

    this.view = new OlView({
      center: fromLonLat([110.3650042, -7.8049497]),
      zoom: 16
      //projection: 'EPSG:4326'
    });

    // --map definitions --
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


    // map sidebar
    var sidebar = new Sidebar({ element: 'sidebar', position: 'right' });
    var scale = new Control.ScaleLine;
    this.map.addControl(sidebar);
    this.map.addControl(scale);



    // Search control
    let search = new SearchNominatim(
      {	//target: $(".options").get(0),
        polygon: true,
        reverse: true,
        position: true	// Search, with priority to geo position
      });



    this.map.addControl(search);
    // Move to the position on selection in the control list
    search.on('select', (e) => {

      if (this.sLayer) {
        this.map.removeLayer(this.sLayer);
      }

      // Current selection
      this.sLayer = new OlVectorLayer({
        //@ts-ignore
        title: 'Hasil Pencarian',
        source: new OlVectorSource(),
        style: new Style({
          image: new Circle({
            radius: 5,
            stroke: new Stroke({
              color: 'rgb(255,165,0)',
              width: 3
            }),
            fill: new Fill({
              color: 'rgba(255,165,0,.3)'
            })
          }),
          stroke: new Stroke({
            color: 'rgb(255,165,0)',
            width: 3
          }),
          fill: new Fill({
            color: 'rgba(255,165,0,.3)'
          })
        })
      });
      this.map.addLayer(this.sLayer);
      this.map.render();
      //console.log(e);
      this.sLayer.getSource().clear();
      // Check if we get a geojson to describe the search
      if (e.search.geojson) {
        var format = new OlGeoJSON();
        var f = format.readFeature(e.search.geojson, { dataProjection: "EPSG:4326", featureProjection: this.map.getView().getProjection() });
        this.sLayer.getSource().addFeature(f);
        var view = this.map.getView();
        var resolution = view.getResolutionForExtent(f.getGeometry().getExtent(), this.map.getSize());
        var zoom = view.getZoomForResolution(resolution);
        var center = Extent.getCenter(f.getGeometry().getExtent());
        // redraw before zoom
        setTimeout(function () {
          view.animate({
            center: center,
            zoom: Math.min(zoom, 16)
          });
        }, 100);
      }
      else {
        this.map.getView().animate({
          center: e.coordinate,
          zoom: Math.max(this.map.getView().getZoom(), 16)
        });
      }
    });







  } // oninint

  ngAfterViewInit() {

    /*
    setTimeout(() => {
      this.isLoggedIn = this.auth.isSignedIn();
      //console.log(this.isLoggedIn);
    }, 1000
    )
    */

    // for ol to work: set target in afterviewinit
    //this.map.setTarget('map');

    var toc = this.switcher.nativeElement; // getting switcher DOM    
    //LayerSwitcher.renderPanel(this.map, toc); // should be located in ngAfterViewInit instead of onInit

    // Add a layer switcher outside the map
    var switcher = new LayerSwitcher(
      {
        target: toc,
        show_progress: true,
        extent: true

      });
    this.map.addControl(switcher);


    // =========MAIN EVENT ONCLICK================
    this.map.on('click', (evt) => {
      // test call modal


      var viewResolution = /** @type {number} */ (this.view.getResolution());
      var url = this.wmsSource.getGetFeatureInfoUrl(
        evt.coordinate, viewResolution, this.view.getProjection(),//'EPSG:3857',
        {
          'INFO_FORMAT': 'application/json',
          'QUERY_LAYERS': 'sitaru:pola_ruang_rdtr, sitaru:bidang_tanah_tujuh_edit',
          'FEATURE_COUNT': 5
        });

      // getting GetFeatureInfo data
      this.checkattribute.getResponse(url).subscribe(
        res => {
          this.clickedfeature = res;
          //console.log(this.clickedfeature);
          //@ts-ignore
          if (this.clickedfeature.numberReturned <= 1) {
            this.clearSelected()
          } else {
          //this.checkFeature(this.clickedfeature, evt.coordinate);
          this.hightlight.checkFeature(this.clickedfeature, evt.coordinate, this.map);
          }
        });



      //this.checkattribute.getClosestFeature(evt.coordinate);
      //this.checkattribute.displaySnap(evt.coordinate);

      //console.log(res.features);

    });  //==onclick

    /*
    this.map.on('pointermove', (evt) => {
      if (evt.dragging) {
        return;
      }
      var pixel = this.map.;getEventPixel(evt.originalEvent);
      var hit = this.map.forEachLayerAtPixel(pixel, function () {
        return true;
      });
      this.map.getTargetElement().style.cursor = hit ? 'pointer' : '';

    });
    */

  } // afterview init


  clearSelected() {
    this.hightlight.clearHighlight(this.map);
    this.map.removeLayer(this.sLayer);
  }


  openModal(list) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: 'Jenis Kegiatan',
      article: 'the article',
      list: list
    };
    const dialogRef = this.dialog.open(CekizinComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      //console.log("Dialog closed")
      console.log(result)
    });
  }





  /*
  checkFeature(features, coordinate) {
    var ketRDTR = features.features[0].properties;
    var ketBidang = features.features[1].properties;
    //console.log(features);

    if (features) {
      if (features.numberReturned > 2) {
        this.warning.open('Terpilih > 1 bidang tanah. Perbesar tampilan peta');
      } else if (features.numberReturned < 2) {
        this.warning.open('Data bidang tanah atau RDTR tidak tersedia');
      } else {       
        this.popup.show(coordinate, 
        '<h3>Bidang Tanah </h3>' + '<br>' +
        'Zona RDTR: '+  ketRDTR.zona +  '<br>' +
         'Tipe: ' + ketBidang.TIPE +  '<br>' +
         'Luas Bidang (m<sup>2</sup>): ' + ketBidang.luas + '<br>' +
         '<button mat-raised-button color="primary" (click)=check()> Cek Bidang Ini </button>'
          
          );
        this.highlightSelected(this.clickedfeature);
      }
    }
  }; //check feature


  highlightSelected(feature) {
    if (this.VectorLayer) {
      this.map.removeLayer(this.VectorLayer);
    }
    var geom = feature.features[1];
    var format = new OlGeoJSON({
      dataProjection: 'EPSG:3857',
      featureProjection: 'EPSG:3857',
      geometryName: 'the_geom'
    });
    var vectorSource = new OlVectorSource({
      features: format.readFeatures(geom)
    });
    var style = new Style({
      fill: new Fill({
        color: 'yellow'
      }),
        stroke: new Stroke({
        color: 'red',
        width: 2
      })
    });
    this.VectorLayer = new OlVectorLayer({
      source: vectorSource,
      style: style,
      renderMode: 'image',
      //@ts-ignore
      title: 'Bidang Tanah Terpilih',
      name: 'Selected'
      //map: this.map
    });
    this.map.addLayer(this.VectorLayer);
    this.map.render();
  } // highlight selected feature

  check(){
    console.log("check");
  }

  */

}

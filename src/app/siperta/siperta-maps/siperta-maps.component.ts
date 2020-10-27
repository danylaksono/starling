import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';


import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import { Fill, Circle, Stroke, Style } from 'ol/style';
import OlVectorSource from 'ol/source/Vector';
import OlVectorLayer from 'ol/layer/Vector';
import OlGeoJSON from 'ol/format/GeoJSON';
import TileWMS from 'ol/source/TileWMS';
import * as Control from 'ol/control';
import { Sidebar } from 'ol/control.js';
import SearchNominatim from 'ol-ext/control/SearchNominatim';
import LayerSwitcher from 'ol-ext/control/LayerSwitcher';
import { fromLonLat, transform } from 'ol/proj';
import * as Extent from 'ol/Extent';
import { Observable } from "rxjs";
import {easeIn, easeOut} from 'ol/easing';




// components and services
import { DialogAttributeComponent } from './../dialog/dialog-attribute/dialog-attribute.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { BasemaplayerService } from '../../service/basemaplayer.service';
import { SipertaoverlayService } from './../../service/sipertaoverlay.service';
import { CheckattributeService } from '../../service/checkattribute.service';
import { AuthService } from 'src/app/service/auth.service';
import { AtributBankTanahComponent } from '../dialog/atribut-bank-tanah/atribut-bank-tanah.component';





@Component({
  selector: 'app-siperta-maps',
  templateUrl: './siperta-maps.component.html',
  styleUrls: ['./siperta-maps.component.scss']
})

export class SipertaMapsComponent implements OnInit {

  map: OlMap;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView;
  wmsSource: TileWMS;
  VectorLayer: OlVectorLayer;
  isLoggedIn: Observable<boolean>;


  basemap: any[];
  overlay: {};
  list: any[];
  clickedfeature: any[];
  panelOpenState2 = false;
  sLayer: OlVectorLayer;

  @ViewChild('switcher2') switcher2: ElementRef;

  constructor(
    public basemaplayers: BasemaplayerService,
    public overlaylayers: SipertaoverlayService,
    private checkattribute: CheckattributeService,
    public dialog: MatDialog,
    private auth: AuthService,
  ) {
    this.isLoggedIn = auth.isLoggedIn();
  }

  ngOnInit() {

    // for get featureinfo
    this.wmsSource = new TileWMS({
      url: 'https://geoserver.jogjakota.go.id/geoserver/siperta/wms',
      params: {
        'LAYERS': 'siperta:LAHAN_PEMKOT_YOGYAKARTA',
        'FORMAT': 'image/png8',
        'TILED': false,
        'VERSION': '1.1.1',
      },
      serverType: 'geoserver',
      crossOrigin: 'anonymous'
    });


    this.view = new OlView({
      center: fromLonLat([110.3650042, -7.8049497]),
      zoom: 16,
      //projection: 'EPSG:4326'
    });

    // --map definitions --
    this.map = new OlMap({
      target: 'sipertamap',
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


  } //oninit


  ngAfterViewInit() {
    // for ol to work: set target in afterviewinit
    //this.map.setTarget('sipertamap');

    var toc = this.switcher2.nativeElement; // getting switcher DOM    
    //LayerSwitcher.renderPanel(this.map, toc); // should be located in ngAfterViewInit instead of onInit

    // Add a layer switcher outside the map
    var switcher = new LayerSwitcher(
      {
        target: toc,
        show_progress: true,
        extent: true

      });
    this.map.addControl(switcher);

    this.map.on('click', (evt) => {
      //console.log('cl')

      var viewResolution = /** @type {number} */ (this.view.getResolution());
      var url = this.wmsSource.getGetFeatureInfoUrl(
        evt.coordinate, viewResolution, this.view.getProjection(),//'EPSG:3857',
        {
          'INFO_FORMAT': 'application/json',
          'QUERY_LAYERS': 'siperta:LAHAN_PEMKOT_YOGYAKARTA',
          'FEATURE_COUNT': 1
        });

      // getting GetFeatureInfo data
      this.checkattribute.getResponse(url).subscribe(
        res => {
          this.clickedfeature = res;
          //this.checkFeature(this.clickedfeature, evt.coordinate);
          //console.log(this.clickedfeature);
          //@ts-ignore
          if (this.clickedfeature.numberReturned == 0) {
            this.clearSelected()
          } else {
            this.highlightSelected(this.clickedfeature, this.map);
            this.openModalShowAttribute(this.clickedfeature);
          }
        }
      );
    });
  } //afterview


  highlightSelected(feature, map) {
    if (this.VectorLayer) {
      map.removeLayer(this.VectorLayer);
    }
    var geom = feature.features[0];
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
      title: 'Aset Terpilih',
      name: 'Selected'
      //map: this.map
    });
    map.addLayer(this.VectorLayer);
    map.render();
  } // highlight selected feature


  //======= clear selected highlight =======
  clearSelected() {
    if (this.VectorLayer || this.sLayer) {
      this.map.removeLayer(this.VectorLayer);
      this.map.removeLayer(this.sLayer);
    }
  } // clear selection


  //=========== open attribute aset pemkot ===========
  openModalShowAttribute(data) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig = {
      disableClose: false,
      autoFocus: true,
      //height : '200px',
      //width: '600px',
      hasBackdrop: false
    }
    dialogConfig.data = {
      id: 2,
      title: 'Keterangan Aset',
      atribut: data

    };
    const dialogRef = this.dialog.open(DialogAttributeComponent, dialogConfig);
    //dialogRef.closeAll();
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'A') {
        // handle A button close
        //console.log('A');
        //this.query.openModalCekIzin(rdtr, bidang);
      }
      //if (result) {
      //console.log(result);
      //}
    });
  } //opendialog aset

  //=========== open attribute bank tanah ===========
  openAttributeBankTanah() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig = {
      disableClose: false,
      autoFocus: true,
      //height: '500px',
      width: '100%',
      //width: '100%',
      //position: { bottom: '0', right:'0' },
      hasBackdrop: false
    }
    dialogConfig.data = {
      id: 2,
      title: 'Atribut Bank Tanah',
      atribut: 'data'

    };
    const dialogRef = this.dialog.open(AtributBankTanahComponent, dialogConfig);

    const sub = dialogRef.componentInstance.onZoom.subscribe(
      ($event) => {
        //console.log($event);
        this.zoomToLatLng($event.lat, $event.long);

      }
    )

    //dialogRef.closeAll();
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'A') {
        // handle A button close
        //console.log('A');
        //this.query.openModalCekIzin(rdtr, bidang);
      }
      //if (result) {
      //console.log(result);
      //}
    });
  } //opendialog bank tanahT

  zoomToLatLng(lat, long) {
    //this.map.getView().setCenter(transform([long, lat],'EPSG:4326','EPSG:3857'));
    console.log('lat', lat);
    console.log('long', long);
    this.map.getView().setCenter(fromLonLat([Number(long), Number(lat)]));
    this.map.getView().setZoom(18);

  }




}

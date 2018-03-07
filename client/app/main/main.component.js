import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  awesomeThings = [];
  newThing = '';

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;
    $scope.data = [];
    $scope.infocontent = {};
    $scope.openinfowindow = false;

    $scope.center = {
      lat: -6.866007882805485,
      lng: 117.44335937499999,
      zoom: 5
    };

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });

    this.map = {
      layers: {
        baselayers: {
          Esri_OceanBasemap: {
            name: 'ESRI Ocean',
            type: 'xyz',
            url: 'http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}',
            layerOptions: {
              showOnSelector: false,
              attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
              maxZoom: 13
            }
          }
        },
        overlays: {
          OpenMapSurfer_AdminBounds: {
            name: 'OpenMapSurfer',
            type: 'xyz',
            visible: true,
            url: 'http://korona.geog.uni-heidelberg.de/tiles/adminb/x={x}&y={y}&z={z}',
            layerOptions: {
              showOnSelector: false,
              maxZoom: 19,
              attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }
          }
        }
      },
      controls: {},
      events: {
        marker: {
          enable: ['click', 'popupopen', 'popupclose'],
          logic: 'emit'
        },
        map: {
          enable: ['context', 'zoomstart', 'drag', 'click',
            'mousemove'
          ],
          logic: 'emit'
        }
      }
    }; //map

  }

  $onInit() {
    this.$http.get('/api/things')
      .then(response => {
        this.awesomeThings = response.data;
        this.socket.syncUpdates('thing', this.awesomeThings);
      });
  }

  addThing() {
    if(this.newThing) {
      this.$http.post('/api/things', {
        name: this.newThing
      });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete(`/api/things/${thing._id}`);
  }
}

export default angular.module('starlingApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;

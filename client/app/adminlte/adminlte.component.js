'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './adminlte.routes';

export class AdminlteComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('starlingApp.adminlte', [uiRouter])
  .config(routes)
  .component('adminlte', {
    template: require('./adminlte.html'),
    controller: AdminlteComponent,
    controllerAs: 'adminlteCtrl'
  })
  .name;

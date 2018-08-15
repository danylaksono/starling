'use strict';
const angular = require('angular');

/*@ngInject*/
export function layerListService() {
	// AngularJS will instantiate a singleton by calling "new" on this function
}

export default angular.module('starlingApp.layerList', [])
  .service('layerList', layerListService)
  .name;

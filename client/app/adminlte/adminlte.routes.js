'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('adminlte', {
      url: '/adminlte',
      template: '<adminlte></adminlte>'
    });
}

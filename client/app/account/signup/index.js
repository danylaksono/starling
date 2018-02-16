'use strict';

import angular from 'angular';
import SignupController from './signup.controller';

export default angular.module('starlingApp.signup', [])
  .controller('SignupController', SignupController)
  .name;

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngDialog from 'ng-dialog';
import ngAnimate from 'angular-animate';
import toastr from 'angular-toastr';
import components from './components';
import appComponent from './app.component';
import constants from './constants';

angular.module('app', [
    uiRouter,
    ngDialog,
    ngAnimate,
    toastr,
    components,
    constants
  ])
  .config($locationProvider => {
    'ngInject';

    $locationProvider.html5Mode(true).hashPrefix('!');
  })
  .component('app', appComponent);
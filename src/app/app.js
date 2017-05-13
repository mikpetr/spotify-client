import angular from 'angular';
import uiRouter from 'angular-ui-router';
import components from './components';
import appComponent from './app.component';
import constants from './constants';

angular.module('app', [
    uiRouter,
    components,
    constants
  ])
  .config($locationProvider => {
    'ngInject';

    $locationProvider.html5Mode(true).hashPrefix('!');
  })
  .component('app', appComponent);
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import AppComponent from './app.component';

angular.module('app', [
    uiRouter
  ])
  .config($locationProvider => {
    'ngInject';

    $locationProvider.html5Mode(true).hashPrefix('!');
  })
  .component('app', AppComponent);
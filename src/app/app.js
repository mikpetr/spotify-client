import angular from 'angular';
import uiRouter from 'angular-ui-router';
import components from './components';
import appComponent from './app.component';

angular.module('app', [
    uiRouter,
    components
  ])
  .config($locationProvider => {
    'ngInject';

    $locationProvider.html5Mode(true).hashPrefix('!');
  })
  .component('app', appComponent);
import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
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
  .config(($locationProvider, $stateProvider, $urlRouterProvider) => {
    'ngInject';

    $locationProvider.html5Mode(true).hashPrefix('!');

    $stateProvider.state({
      name: 'search',
      url: '/',
      template: '<search></search>',
      reloadOnSearch: false
    });

    $urlRouterProvider.otherwise('/');
  })
  .component('app', appComponent);
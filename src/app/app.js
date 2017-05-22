import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import ngDialog from 'ng-dialog';
import ngAnimate from 'angular-animate';
import toastr from 'angular-toastr';
import components from './components';
import AppComponent from './app.component';
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

    /**
     * @desc - Disable "#" symbol before route
     */
    $locationProvider.html5Mode(true).hashPrefix('!');

    $stateProvider.state({
      name: 'search',
      url: '/',
      template: '<search></search>',
      reloadOnSearch: false
    });

    $urlRouterProvider.otherwise('/');
  })
  .component('app', AppComponent);

/**
 * @description
 * Adding service worker for caching app.
 * We don't need to cache app in testing and development mode.
 * Variable "jasmine" only exists in testing mode.
 * Variable "webpackHotUpdate" only exists in development mode.
 * So we run service worker only when "jasmine" and "webpackHotUpdate" are not defined
 */
if (typeof jasmine === 'undefined' && typeof webpackHotUpdate === 'undefined' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
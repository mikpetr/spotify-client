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
  .component('app', appComponent);

/**
 * @description
 * Adding service worker for caching app.
 * We don't need to cache app in testing mode.
 * Variable "jasmine" only exists in testing mode.
 * So we run service worker only when "jasmine" is not defined
 */
if (typeof jasmine === 'undefined' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
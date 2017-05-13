import angular from 'angular';

let constantsModule = angular.module('app.constants', []);

constantsModule
  .constant('apiUrl', 'https://api.spotify.com/v1');

export default constantsModule.name;
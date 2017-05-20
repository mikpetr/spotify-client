import angular from 'angular';

let constantsModule = angular.module('app.constants', []);

constantsModule
  .constant('apiUrl', 'https://api.spotify.com/v1')
  .constant('defaultImageUrl', '/assets/images/default-cover.png');

export default constantsModule.name;
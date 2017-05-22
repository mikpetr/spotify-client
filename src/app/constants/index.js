import angular from 'angular';

/**
 * @desc - This module for defining constants.
 */
let ConstantsModule = angular.module('app.constants', []);

ConstantsModule
  .constant('apiUrl', 'https://api.spotify.com/v1')
  .constant('defaultImageUrl', '/assets/images/default-cover.png');

export default ConstantsModule.name;
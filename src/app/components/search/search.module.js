import angular from 'angular';
import searchComponent from './search.component';
import SearchFactory from './search.factory';
import searchListComponent from './search-list/search-list.component';
import searchItemComponent from './search-item/search-item.component';

/**
 * @desc - This module is for search functionality.
 */
let searchModule = angular.module('app.components.search', []);

searchModule
  .component('search', searchComponent)
  .component('searchList', searchListComponent)
  .component('searchItem', searchItemComponent)
  .factory('SearchFactory', SearchFactory);

export default searchModule.name;
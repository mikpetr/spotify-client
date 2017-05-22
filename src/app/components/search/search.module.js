import angular from 'angular';
import SearchComponent from './search.component';
import SearchFactory from './search.factory';
import SearchListComponent from './search-list/search-list.component';
import SearchItemComponent from './search-item/search-item.component';

/**
 * @desc - This module is for search functionality.
 */
let SearchModule = angular.module('app.components.search', []);

SearchModule
  .component('search', SearchComponent)
  .component('searchList', SearchListComponent)
  .component('searchItem', SearchItemComponent)
  .factory('SearchFactory', SearchFactory);

export default SearchModule.name;
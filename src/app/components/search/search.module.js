import angular from 'angular';
import searchComponent from './search.component';
import searchRowComponent from './search-row/search-row.component';
import searchListComponent from './search-list/search-list.component';
import searchItemComponent from './search-item/search-item.component';

let searchModule = angular.module('app.components.search', []);

searchModule
  .component('search', searchComponent)
  .component('searchRow', searchRowComponent)
  .component('searchList', searchListComponent)
  .component('searchItem', searchItemComponent);

export default searchModule;
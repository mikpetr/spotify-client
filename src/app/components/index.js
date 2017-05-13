import angular from 'angular';
import headerComponent from './header';
import searchRowComponent from './search-row';
import searchListComponent from './search-list';
import searchItemComponent from './search-item';
import footerComponent from './footer';

let componentsModule = angular.module('app.components', []);

componentsModule
  .component('header', headerComponent)
  .component('searchRow', searchRowComponent)
  .component('searchList', searchListComponent)
  .component('searchItem', searchItemComponent)
  .component('footer', footerComponent);

export default componentsModule.name;
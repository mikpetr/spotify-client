import angular from 'angular';
import headerComponent from './header/header.component';
import footerComponent from './footer/footer.component';
import searchModule from './search/search.module';

let componentsModule = angular.module('app.components', [searchModule.name]);

componentsModule
  .component('header', headerComponent)
  .component('footer', footerComponent);

export default componentsModule.name;
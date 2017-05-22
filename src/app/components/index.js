import angular from 'angular';
import HeaderComponent from './header/header.component';
import FooterComponent from './footer/footer.component';
import searchModule from './search/search.module';

let ComponentsModule = angular.module('app.components', [searchModule]);

ComponentsModule
  .component('header', HeaderComponent)
  .component('footer', FooterComponent);

export default ComponentsModule.name;
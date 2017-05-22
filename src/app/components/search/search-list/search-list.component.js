import template from './search-list.html';
import controller from './search-list.controller';
import './search-list.scss';

let SearchListComponent = {
  template,
  controller,
  controllerAs: 'sL',
  restrict: 'E',
  bindings: {
    list: '<'
  }
};

export default SearchListComponent;
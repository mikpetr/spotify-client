import template from './search-list.html';
import controller from './search-list.controller';
import './search-list.scss';

let searchListComponent = {
  template,
  controller,
  controllerAs: 'sL',
  restrict: 'E'
};

export default searchListComponent;
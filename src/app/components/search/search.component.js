import template from './search.html';
import controller from './search.controller';
import './search.scss';

let SearchComponent = {
  template,
  controller: controller,
  controllerAs: 'sC',
  restrict: 'E'
};

export default SearchComponent;
import template from './search.html';
import controller from './search.controller';
import './search.scss';

let searchComponent = {
  template,
  controller: controller,
  controllerAs: 'sC',
  restrict: 'E'
};

export default searchComponent;
import template from './search-item.html';
import controller from './search-item.controller';
import './search-item.scss';

let searchItemComponent = {
  template,
  controller: controller,
  controllerAs: 'sI',
  restrict: 'E',
  bindings: {
    item: '='
  }
};

export default searchItemComponent;
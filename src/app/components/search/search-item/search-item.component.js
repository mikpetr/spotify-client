import template from './search-item.html';
import './search-item.scss';

let searchItemComponent = {
  template,
  controllerAs: 'sI',
  restrict: 'E',
  bindings: {
    item: '<'
  }
};

export default searchItemComponent;
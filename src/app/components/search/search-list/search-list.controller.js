import searchItemDetailsTemplate from '../search-item-details/search-item-details.html';
import searchItemDetailsController from '../search-item-details/search-item-details.controller';

class SearchListController {
  constructor (ngDialog) {
    this._ngDialog = ngDialog;
  }

  openDetails (item) {
    this._ngDialog.open({
      template: searchItemDetailsTemplate,
      controller: searchItemDetailsController,
      controllerAs: 'sIDC',
      resolve: {
        searchItem: () => item
      },
      plain: true,
      className: 'ngdialog-theme-default search-item-details'
    });
  }
}

export default SearchListController;
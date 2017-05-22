import searchItemDetailsTemplate from '../search-item-details/search-item-details.html';
import SearchItemDetailsController from '../search-item-details/search-item-details.controller';

class SearchListController {

  constructor (ngDialog) {
    this._ngDialog = ngDialog;
  }

  /**
   * Open details dialog
   * @param {object} item - Artist or album object
   */
  openDetails (item) {
    this._ngDialog.open({
      template: searchItemDetailsTemplate,
      controller: SearchItemDetailsController,
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
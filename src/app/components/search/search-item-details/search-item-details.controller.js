/**
 * @desc - This component is for item details dialog window
 */
class SearchItemDetailsController {
  constructor (searchItem, SearchFactory, toastr) {

    this.item = searchItem;
    this.tracks = [];
    let promise;

    /**
     * @desc - Get additional information like album tracks or artist albums
     */
    if (searchItem.type === 'album') {
      promise = SearchFactory.getTracks(searchItem.id);
    } else {
      promise = SearchFactory.getAlbums(searchItem.id);
    }

    promise.then(res => {
      this.items = res.data.items;
    }, err => {
      toastr.error('Failed to load details. Please try again!', 'Error');
    });
  }
}

export default SearchItemDetailsController;
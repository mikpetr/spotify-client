class SearchItemDetailsController {
  constructor (searchItem, SearchFactory) {

    this.item = searchItem;
    this.tracks = [];
    let promise;
    
    if (searchItem.type === 'album') {
      promise = SearchFactory.getTracks(searchItem.id);
    } else {
      promise = SearchFactory.getAlbums(searchItem.id);
    }

    promise.then(res => {
      this.items = res.data.items;
    }, err => {
      console.log('Failed to load');
    });
  }
}

export default SearchItemDetailsController;
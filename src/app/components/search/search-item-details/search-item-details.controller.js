class SearchItemDetailsController {
  constructor (searchItem, SearchFactory) {
    console.log(searchItem);
    this.item = searchItem;

    this.item.image = this.item.images[0] ? this.item.images[0].url : '/assets/images/default-cover.png';

    this.tracks = [];

    let promise;
    
    if (searchItem.type === 'album') {
      promise = SearchFactory.getTracks(searchItem.id);
    } else {
      promise = SearchFactory.getAlbums(searchItem.id);
    }

    promise.then(res => {
      console.log(res);
      this.items = res.data.items;
    }, err => {
      console.log('Failed to load tracks');
    });
  }
}

export default SearchItemDetailsController;
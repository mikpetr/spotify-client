class SearchItemDetailsController {
  constructor (searchItem, SearchFactory, $scope) {

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
      this.items = res.data.items;
      $scope.$digest();
    }, err => {
      console.log('Failed to load');
    });
  }
}

export default SearchItemDetailsController;
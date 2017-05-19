class SearchController {
  constructor (SearchFactory) {
    this._SearchFactory = SearchFactory;
    
    this._offsetPerType = 0;
    this._limitPerType = 6;

    this.query = null;
    this.isLoading = false;

    this.results = {
      data: null,
      existsMore: false
    };
  }

  search () {
    if (!this.query) {
      return Promise.reject();
    }

    this._offsetPerType = 0;
    this.isLoading = true;

    return this._SearchFactory.search(this.query, 0, this._limitPerType).then(res => {
      this.results = res;
      this.isLoading = false;
    }, err => {
      console.log('Failed to search!');
      this.results.data = [];
      this.results.existsMore = false;
      this.isLoading = false;
    });
  }

  loadMore () {
    this._offsetPerType += this._limitPerType;
    this.isLoading = true;

    return this._SearchFactory.search(this.query, this._offsetPerType, this._limitPerType).then(res => {
      this.results.data = [...this.results.data, ...res.data];
      this.results.existsMore = res.existsMore;
      this.isLoading = false;
    }, err => {
      console.log('Failed to load!');
      this.isLoading = false;
    });
  }
}

export default SearchController;
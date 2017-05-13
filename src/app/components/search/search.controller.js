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
      return;
    }

    this._offsetPerType = 0;
    this.isLoading = true;

    this._SearchFactory.search(this.query, 0, this._limitPerType).then(res => {
      this.results = res;
    }, err => {
      console.log('Failed to search!');
    }).finally(() => {
      this.isLoading = false;
    });
  }

  loadMore () {
    this._offsetPerType += this._limitPerType;
    this.isLoading = true;

    this._SearchFactory
        .search(this.query, this._offsetPerType, this._limitPerType)
        .then(res => {
          this.results.data = [...this.results.data, ...res.data];
          this.results.existsMore = res.existsMore;
        }, err => {
          console.log('Failed to load!');
        })
        .finally(() => {
          this.isLoading = false;
        });
  }
}

export default SearchController;
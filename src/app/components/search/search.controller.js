class SearchController {
  constructor (SearchFactory, $q, toastr, $location) {
    this._SearchFactory = SearchFactory;
    this._$q = $q;
    this._toastr = toastr;
    this._$location = $location;
    
    this._offsetPerType = 0;
    this._limitPerType = 6;

    /**
     * @desc - Try to load query string from URL
     */
    this.query = $location.search().query || null;
    this.isLoading = false;

    this.results = {
      data: null,
      existsMore: false
    };

    /**
     * @desc - Automatically search if opened by link and exists query
     */
    if (this.query) {
      this.search();
    }
  }

  /**
   * @desc - Search for items
   */
  search () {
    if (!this.query) {
      return this._$q.reject();
    }

    /**
     * @desc - Update query string in URL 
     */
    this._$location.search('query', this.query);

    this._offsetPerType = 0;
    this.isLoading = true;

    /**
     * @desc - Send request for searching
     */
    return this._SearchFactory.search(this.query, 0, this._limitPerType).then(res => {
      this.results = res;
      this.isLoading = false;
    }, err => {
      this._toastr.error('Failed to search. Please try again!', 'Error');
      this.results.data = [];
      this.results.existsMore = false;
      this.isLoading = false;
    });
  }

  /**
   * @desc - Load more items
   */
  loadMore () {
    this._offsetPerType += this._limitPerType;
    this.isLoading = true;

    /**
     * @desc - Send request for loading more items
     */
    return this._SearchFactory.search(this.query, this._offsetPerType, this._limitPerType).then(res => {
      this.results.data = [...this.results.data, ...res.data];
      this.results.existsMore = res.existsMore;
      this.isLoading = false;
    }, err => {
      this._toastr.error('Failed to load more. Please try again!', 'Error');
      this.isLoading = false;
      this._offsetPerType -= this._limitPerType;
    });
  }
}

export default SearchController;
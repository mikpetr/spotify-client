describe('controller: search', () => {
  let controller;
  let fakeSearchFactory;
  let $rootScope;

  beforeEach(module('app'));

  beforeEach(module($provide => {
    $provide.factory('SearchFactory', () => {
      fakeSearchFactory = {
        search: () => Promise.resolve({
          data: [{}],
          existsMore: true
        })
      };

      return fakeSearchFactory;
    });
  }));

  beforeEach(inject((_$rootScope_, $componentController) => {
    $rootScope = _$rootScope_;
    controller = $componentController('search');
  }));


  it('should de defined', () => {
    expect(controller).toBeDefined();
  });


  it('should search for artists and albums', () => {
    
    spyOn(fakeSearchFactory, 'search').and.callThrough();

    controller.query = 'Jazz';
    controller.search();

    expect(fakeSearchFactory.search).toHaveBeenCalledWith(controller.query, 0, controller._limitPerType);
  });


  it('should not search if query is empty or null', () => {
    
    spyOn(fakeSearchFactory, 'search').and.callThrough();

    controller.search();
    expect(fakeSearchFactory.search).not.toHaveBeenCalled();

    controller.query = '';
    controller.search();
    expect(fakeSearchFactory.search).not.toHaveBeenCalled();
  });


  it('should overwrite old search results when make a new search', (done) => {
    
    controller.query = 'Jazz';
    controller.search().then(() => {
      let oldSearchResults = controller.results.data;

      controller.query = 'Marcus Miller';
      controller.search().then(() => {
        expect(oldSearchResults).not.toBe(controller.results.data);
        done();
      });
    });

    $rootScope.$digest();
  });

  it('should load more results', (done) => {

    controller.query = 'Barefoot on the beach';
    controller.search().then(() => {
      let oldSearchItemsLength = controller.results.data.length;
      
      controller.loadMore().then(() => {
        expect(controller.results.data.length).toBeGreaterThan(oldSearchItemsLength);
        done();
      });
    });

    $rootScope.$digest();
  });
});
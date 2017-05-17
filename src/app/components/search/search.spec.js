describe('controller: search', () => {
  let controller;
  let SearchFactory;
  let deferred;

  beforeEach(module('app'));

  beforeEach(() => {
    // deferred = $q.defer();

    let mockSearchFactory = function () {
      return {
        search: () => 'aa'
      };
    };

    // SearchFactory = $provide.factory('SearchFactory', {
    //   search: () => {
    //     return deferred.promise;
    //   }
    // });

    module($provide => {
      $provide.factory('SearchFactory', mockSearchFactory)
    });
    
  });


  // it('should de defined', () => {
  //   expect(controller).toBeDefined();
  // });


  // it('should search for artists and albums', () => {
  //   controller.query = 'Jazz';
  //   controller.search();

  //   expect(SearchFactory.search).toHaveBeenCalledWith(controller.query, 0, controller._limitPerType);
  // });


  // it('should not search if query is empty or null', () => {
  //   controller.search();
  //   expect(SearchFactory.search).not.toHaveBeenCalled();

  //   controller.query = '';
  //   controller.search();
  //   expect(SearchFactory.search).not.toHaveBeenCalled();
  // });


  it('should overwrite old search results when make a new search', (done) => {

    inject($componentController => {
      let controller = $componentController('search');
      console.log(controller.search().catch(() => {
        
        console.log('a');
        done();
      }));
      // controller.query = 'Jazz';
      // console.log(controller.search());
      
      
    });

    

    

    // inject((SearchFactory, $componentController) => {
    //   let controller = $componentController('search');
      
    //   let a = SearchFactory.search().then(() => {
    //     console.log(deferred.promise === a);

    //     done();
    //   });
    // });

    // let deferred = $q.defer();
    
    // spyOn(SearchFactory, 'search').and.returnValue(deferred.promise);


    // controller.query = 'Marcus Miller';
    
    // let a = controller.search().then(() => {

    //   console.log('controller.results');
    //   expect(2).toBe(2);
      
    //   done();
      
    //   // let oldSearchResults = controller.results.data;

    //   // controller.query = 'Jon Lord';
    //   // controller.search().then(() => {
        
    //   //   expect(controller.results.data).not.toBe(oldSearchResults);
    //   // });
    // });
    // console.log(a === deferred.promise);
    // deferred.resolve({
    //   items: [{}]
    // });
    
    
  });

  // it('should load more results', () => {
  //   let ctrl = $componentController('search', null);

  //   ctrl.query = 'asdaffdfvdfererergerg th dthrt hdthd rth d'; // Barefoot on the beach
  //   console.log(ctrl.query);
  //   ctrl.search().finally(() => {
  //     console.log('aa');
  //     let oldSearchItemsLength = ctrl.results.data.length;
  //     console.log('a', oldSearchItemsLength);

  //     ctrl.loadMore().finally(() => {
  //       expect(ctrl.results.data.length).toBeGreaterThan(oldSearchItemsLength);
  //     });
  //   });
  // });
});
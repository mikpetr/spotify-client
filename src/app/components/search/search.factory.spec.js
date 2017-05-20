describe('factory: search', () => {
  let $rootScope;
  let SearchFactory;
  let apiUrl;
  let $httpBackend;

  beforeEach(module('app'));

  beforeEach(inject((_$rootScope_, _SearchFactory_, _apiUrl_, _$httpBackend_) => {
    $rootScope = _$rootScope_;
    SearchFactory = _SearchFactory_;
    apiUrl = _apiUrl_;
    $httpBackend = _$httpBackend_;

    $httpBackend.whenRoute('GET', `${apiUrl}/search`).respond({
      albums: {
        items: []
      },
      artists: {
        items: []
      }
    });

    $httpBackend.whenRoute('GET', `${apiUrl}/albums/:id/tracks`).respond({
      items: []
    });

    $httpBackend.whenRoute('GET', `${apiUrl}/artists/:id/albums`).respond({
      items: [{
        id: 1002,
        images: []
      }]
    });

    $httpBackend.whenRoute('GET', `${apiUrl}/albums/:id`).respond({});
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });


  it('should be defined', () => {
    expect(SearchFactory).toBeDefined();
  });


  it('should send request when calling search method', () => {
    $httpBackend.expectRoute('GET', `${apiUrl}/search`);

    SearchFactory.search('Jazz');
    $httpBackend.flush();
  });


  it('should return promise when calling search method', () => {
    $httpBackend.expectRoute('GET', `${apiUrl}/search`);

    expect(SearchFactory.search().constructor.name).toBe('Promise');
    $httpBackend.flush();
  });


  it('should set images aliases for every found item when calling search method', () => {
    $httpBackend
      .expectRoute('GET', `${apiUrl}/search`)
      .respond({
        albums: {
          items: [{
            images: []
          }]
        },
        artists: {
          items: [{
            images: [{
              width: 640,
              height: 640,
              url: 'https://api.spotify.com/images/100001.png'
            }]
          }]
        }
      });

    SearchFactory.search('Jazz').then(res => {
      res.data.forEach(item => {
        expect(item.smallImage).toBeDefined();
        expect(item.largeImage).toBeDefined();
      });
    });

    $httpBackend.flush();
  });


  it('should indicate if more results exists or not with the response of search method', () => {
    let responseObj = {
      artists: {
        items: [{
          images: []
        }],
        next: null
      },
      albums: {
        items: [{
          images: []
        }],
        next: null
      }
    };
    
    $httpBackend
      .expectRoute('GET', `${apiUrl}/search`)
      .respond(responseObj);

    SearchFactory.search('Jazz').then(res => {
      expect(res.existsMore).toBe(false);

      responseObj.artists.next = 'https://api.spotify.com/some-next-page-url';

      $httpBackend
        .expectRoute('GET', `${apiUrl}/search`)
        .respond(responseObj);

      SearchFactory.search('Jazz').then(res => {
        expect(res.existsMore).toBe(true);
      });
    });

    $httpBackend.flush();
  });


  it('should send request when calling getTrucks method', () => {
    $httpBackend.expectRoute('GET', `${apiUrl}/albums/:id/tracks`);

    SearchFactory.getTracks(1001);
    $httpBackend.flush();
  });


  it('should return promise when calling getTrucks method', () => {
    $httpBackend.expectRoute('GET', `${apiUrl}/albums/:id/tracks`);

    expect(SearchFactory.getTracks().constructor.name).toBe('Promise');
    $httpBackend.flush();
  });


  it('should make calls for getting albums and album details when calling getAlbums method', () => {
    $httpBackend.expectRoute('GET', `${apiUrl}/artists/:id/albums`);
    $httpBackend.expectRoute('GET', `${apiUrl}/albums/:id`);

    SearchFactory.getAlbums(1001);

    $httpBackend.flush();
  });


  it('should load album details when calling getAlbums method', () => {
    SearchFactory.getAlbums(1001).then(res => {
      res.data.items.forEach(item => {
        expect(item.details).toBeDefined();
      });
    });

    $httpBackend.flush();
  });
});
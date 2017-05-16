let SearchFactory = function (apiUrl, $http, $q) {

  function search (query, offset, limit) {
    return $http.get(`${apiUrl}/search`, {
      params: {
        type: 'artist,album',
        q: query,
        offset,
        limit
      }
    }).then(res => {
      let data = [...res.data.albums.items, ...res.data.artists.items];

      data.forEach(item => {
        if (item.images && item.images.length) {
          item.image = item.images[1] ? item.images[1].url : item.images[0].url;
        } else {
          item.image = '/assets/images/default-cover.png';
        }
      });
      
      return {
        data,
        existsMore: !!(res.data.albums.next || res.data.artists.next)
      };
    });
  }

  function getTracks (albumId, offset = 0, limit = 5) {
    return $http.get(`${apiUrl}/albums/${albumId}/tracks`, {
      params: {
        offset,
        limit
      }
    });
  }

  function getAlbums (artistId, offset = 0, limit = 5) {
    let deferred = $q.defer();

    $http.get(`${apiUrl}/artists/${artistId}/albums`, {
      params: {
        offset,
        limit
      }
    }).then(res => {
      let promises = [];

      res.data.items.forEach(album => {
        if (album.images.length) {
          let preferredImage = album.images.find(image => image.width === 300);
          album.image = preferredImage ? preferredImage.url : '/assets/images/default-cover.png';
        }

        promises.push(getAlbumDetails(album.id).then(res => {
          album.details = res.data;
        }));
      });

      $q.all(promises).then(() => {
        deferred.resolve(res);
      }, err => {
        deferred.reject(err);
      });
    }, err => {
      deferred.reject(err);
    });

    return deferred.promise;
  }

  function getAlbumDetails (albumId) {
    return $http.get(`${apiUrl}/albums/${albumId}`);
  }

  return {
    search,
    getTracks,
    getAlbums
  };
};

export default SearchFactory;
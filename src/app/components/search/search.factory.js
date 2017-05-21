let SearchFactory = function (apiUrl, $http, $q, defaultImageUrl) {

  /**
   * @param {string} query - Text for searching
   * @param {number} offset - Start index of searching per type
   * @param {number} limit - Count of items per type
   */
  function search (query, offset = 0, limit = 6) {
    return $http.get(`${apiUrl}/search`, {
      params: {
        type: 'artist,album',
        q: query,
        offset,
        limit
      }
    }).then(res => {
      let data = [...res.data.albums.items, ...res.data.artists.items];

      data.forEach(createImagesAliases);
      
      return {
        data,
        existsMore: !!(res.data.albums.next || res.data.artists.next)
      };
    });
  }

  /**
   * @param {number} albumId - Id of album
   * @param {number} offset - Start index
   * @param {number} limit - Count
   */
  function getTracks (albumId, offset = 0, limit = 5) {
    return $http.get(`${apiUrl}/albums/${albumId}/tracks`, {
      params: {
        offset,
        limit
      }
    });
  }

  /**
   * @param {number} artistId - Id of artist
   * @param {number} offset - Start index
   * @param {number} limit - Count
   */
  function getAlbums (artistId, offset = 0, limit = 5) {
    return $q((resolve, reject) => {
      $http.get(`${apiUrl}/artists/${artistId}/albums`, {
        params: {
          offset,
          limit
        }
      }).then(res => {
        let promises = [];

        res.data.items.forEach(album => {
          createImagesAliases(album);

          promises.push(getAlbumDetails(album.id).then(res => {
            album.details = res.data;
          }));
        });
        
        $q.all(promises).then(() => {
          resolve(res);
        }, reject);
      }, reject);
    });
  }

  /**
   * @param {number} albumId - Id of album
   */
  function getAlbumDetails (albumId) {
    return $http.get(`${apiUrl}/albums/${albumId}`);
  }

  /**
   * @param {object} item - Search item or album
   */
  function createImagesAliases (item) {
    item.images.sort((a, b) => a.width > b.width ? 1 : -1);

    let smallImage = item.images.find(image => image.width >= 270);
    item.smallImage = smallImage ? smallImage.url : defaultImageUrl;

    let largeImage = item.images.find(image => image.width >= 750);

    if (largeImage) {
      item.largeImage = largeImage.url;
    } else {
      largeImage = item.images.find(image => image.width >= 600);
      item.largeImage = largeImage ? largeImage.url : item.smallImage;
    }
  }

  return {
    search,
    getTracks,
    getAlbums
  };
};

export default SearchFactory;
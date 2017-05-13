let SearchFactory = function (apiUrl, $http) {

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

  return {
    search
  };
};

export default SearchFactory;
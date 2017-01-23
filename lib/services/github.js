const config = require('../../data/config.json').github;
const request = require('request').defaults({
    method: 'PATCH',
    headers: {
      Accept: '*/*',
      Connection: 'close',
      'User-Agent': 'instaupdate'
    },
    'auth': {
      'user': config.username,
      'pass': config.personalAccessToken
    }
});

const baseUrl = 'https://api.github.com/';

exports.change = function (data, globalCb) {
  let reach = data.image ? 2 : 1;
  let count = 0;

  const callback = function(err) {
    if(err) {
      count = 3;
      return globalCb(err);
    }

    if(++count === reach && globalCb) {
      globalCb();
    }
  };

  request.post({
    url: baseUrl + "user",
     data: {
      name: data.name,
      blog: data.url,
      location: data.location,
      bio: data.description
    }
  }, function (err, res, body) {
    handleResponse(callback, err, res, body);
  });

};

  //Github currently does not seem to support profile image updating
  /*if(!data.image) {
    return;
  }

  request(baseUrl + '', {
    image: data.image
  }, function (err, res, body) {
    handleResponse(callback, err, res, body);
  });
};*/

function handleResponse(callback, err, res, body) {
    if (err) {
        return callback(err);
    }

    // Check status code
    if (res.statusCode < 200 || res.statusCode > 299) {
        return callback(new Error('Invalid response code: ' + res.statusCode));
    }

    try {
        // Empty string is a valid response
        if (body === '') {
            return callback();
        }

        body = JSON.parse(body);
    } catch (e) {
        return callback(e);
    }

    // Check twitter response
    let errs = body['errors'];

    if (errs !== undefined) {
        callback(errs);
    }
}

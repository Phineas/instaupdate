const request = require('request');

const defaults = {
    headers: {
        Accept: '*/*',
        Connection: 'close',
        'User-Agent': 'instaupdate'
    },
    json: true
};

module.exports = function (data, headers) {
    // Merge defaults & data together
    let config = Object.assign({}, defaults, data);
    
    if (headers) {
        // Mix two header objects
        Object.assign(config.headers, headers);
    }
    
    return request.defaults(config);
};
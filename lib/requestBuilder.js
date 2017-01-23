const request = require('request');

const defaults = {
    headers: {
        Accept: '*/*',
        Connection: 'close',
        'User-Agent': 'instaupdate'
    }
};

module.exports = function (data) {
    // Merge defaults & data together
    let config = Object.assign({}, defaults, data);
    
    return request.defaults(config);
};
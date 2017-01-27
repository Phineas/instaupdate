const config = require('../../data/config.json').github;
const baseUrl = 'https://api.github.com/';

const resHandler = require('../resHandler');
const request = require('../requestBuilder')({
    auth: {
        user: config.username,
        pass: config.personalAccessToken
    },
    json: true
}, {
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json'
});

exports.change = function (data, callback) {
    const params = JSON.stringify({
        name: data.name,
        blog: data.url,
        location: data.location,
        bio: data.description
    });
    
    request.patch({
        url: baseUrl + 'user',
        body: params
    }, function (err, res, body) {
        resHandler(callback, err, res, body, true);
    });
};
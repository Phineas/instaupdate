const config = require('../../data/config.json').twitter;

const resHandler = require('../resHandler');
const request = require('../requestBuilder')({
    oauth: {
        consumer_key: config.consumerKey,
        consumer_secret: config.consumerSecret,
        token: config.accessTokenKey,
        token_secret: config.accessTokenSecret
    }
});

const baseUrl = 'https://api.twitter.com/1.1/';

exports.change = function (data, globalCb) {
    let reach = data.image ? 2 : 1;
    let count = 0;

    const callback = function (err) {
        if (err) {
            count = 3;
            return globalCb(err);
        }

        if (++count === reach && globalCb) {
            globalCb();
        }
    };

    request.post(baseUrl + 'account/update_profile.json', {
        name: data.name,
        url: data.url,
        location: data.location,
        description: data.description,
        profile_link_color: data.profileColor
    }, function (err, res, body) {
        resHandler(callback, err, res, body, true);
    });

    if (!data.image) {
        return;
    }

    // Change image
    request.post(baseUrl + 'account/update_profile_image.json', {
        image: data.image
    }, function (err, res, body) {
        resHandler(callback, err, res, body, true);
    });

    // TODO Change banner
};
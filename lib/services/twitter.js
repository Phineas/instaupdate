const config = require('../../data/config.js').twitter;
const request = require('request').defaults({
	method: 'POST',
	headers: {
		Accept: '*/*',
		Connection: 'close',
		'User-Agent': 'instaupdate'
	},
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
	
	request(baseUrl + 'account/update_profile', {
		name: data.name,
		url: data.url,
		location: data.location,
		description: data.description,
		profile_link_color: data.profileColor,
		include_entities: false,
		skip_status: true
	}, function (err, res, body) {
		handleResponse(callback, err, res, body);
	});
	
	if (!data.image) {
		return;
	}
	
	// Change image
	request(baseUrl + 'account/update_profile_image', {
		image: data.image
	}, function (err, res, body) {
		handleResponse(callback, err, res, body);
	});
};

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
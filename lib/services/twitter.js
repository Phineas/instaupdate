const config = require('../../data/config.js').twitter;
const request = require('request');

const options = {
	method: 'POST',
	url: 'https://api.twitter.com/1.1/account/update_profile',
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
};

exports.change = function (changeData, cb) {
	// TODO Implement photo change
	
	request(options, {
		name: changeData.name,
		url: changeData.url,
		location: changeData.location,
		description: changeData.description,
		profile_link_color: changeData.profileColor,
		include_entities: false,
		skip_status: true
	}, function (err, res, body) {
		if (error) {
			return callback(cb, err);
		}
		
		// Check status code
		if (res.statusCode < 200 || res.statusCode > 299) {
			return callback(cb, res.statusCode);
		}
		
		try {
			// Empty string is a valid response
			if (body === '') {
				return callback(cb);
			}
			
			body = JSON.parse(body);
		} catch (e) {
			return callback(cb, e);
		}
		
		// Check twitter response
		let errs = body['errors'];
		
		if (errs !== undefined) {
			callback(cb, errs);
		}
	});
};

function callback() {
	// First arg is callback
	let cb = arguments[0];
	
	if (cb) {
		// Pass the rest of args to the cb func
		cb.apply(this, arguments.slice(1));
	}
}
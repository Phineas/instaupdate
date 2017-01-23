module.exports = function (callback, err, res, body, json) {
    if (err) {
        return callback(err);
    }

    // Check status code
    if (res.statusCode < 200 || res.statusCode > 299) {
        return callback(new Error('Invalid response code: ' + res.statusCode));
    }
    
    if (!json) {
        try {
            // Empty string is a valid response
            if (body === '') {
                return callback();
            }

            body = JSON.parse(body);
        } catch (e) {
            return callback(e);
        }
    }
    
    // Check if key errors exist
    let errs = body['errors'];

    if (errs !== undefined) {
        callback(body['message']);
    }
};
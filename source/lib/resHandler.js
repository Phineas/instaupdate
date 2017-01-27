module.exports = function (callback, err, res, body) {
    if (err) {
        return callback(err);
    }

    // Check status code
    if (res.statusCode < 200 || res.statusCode > 299) {
        return callback(new Error('Invalid response code: ' + res.statusCode));
    }
    
    // Check if key errors exist
    let errs = body['errors'];

    if (errs !== undefined) {
        callback(body['message']);
    }
};
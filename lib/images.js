const fs = require('fs');

// Converts an image to a 64 base encoded bitmap
exports.load = function (file, callback) {
    fs.readFile(file, function (err, data) {
        if (err) {
            return callback(err);
        }
        
        let encoded = new Buffer(data).toString('base64');
        callback(false, encoded);
    });
};
const services = require('../data/config.json');
const profile = require('../data/profile.json');
    
const images = require('./images');

module.exports = function () {
    loadProfile(initConverters);
};

function loadProfile(callback) {
    Object.keys(profile).forEach((key) -> {
        if (!profile[key]) {
            delete profile[key];
        }
    });
    
    // Convert image path to bitmap
    if (profile.image) {
        images.load(profile.image, function (err, bitmap) {
            if (err) {
                throw err;
            }
            
            profile.image = bitmap;
            callback();
        });
    } else callback();
}

function initConverters() {
    const keys = Object.keys(services).filter((key) => services[key].enabled);
    let count = 0;
    
    const callback = function (err) {
        if (err) {
            return console.log(this + ' generated an error: ' + err);
        }

        if (++count >= keys.length) {
            console.log('Success! Changed your data in ' + count + ' accounts');
            process.exit();
        }
    };
    
    keys.forEach(function (name) {
        const converter = require('./services/' + name);
        
        converter.change(profile, callback.bind(name));
    });
}
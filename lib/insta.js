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
            // process.exit();
            console.log('Done!');
        }
    };
    
    keys.forEach(function (name) {
        const converter = require('./services/' + name);
        
        converter.change(profile, callback.bind(name));
    });
}

/*
Data format:
name, url, location, description, profileColor, image 
 */
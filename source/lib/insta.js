import * as images from './images';

class Instaupdate {
    constructor() {
        const config = require('../data/config.json');
        const profile = require('../data/profile.json');
        
        this(config, profile);
    }
    
    constructor(config, profile) {
        this._config = config;
        this._profile = profile;
        
        this._loadProfile();
    }
    
    _loadProfile() {
        const profile = this._profile;
        
        Object.keys(profile).forEach((key) => {
            if (!profile[key]) {
                delete profile[key];
            }
        });
        
        // TODO Is this useless?
        this._profile = profile;
        
        if (profile.image) {
            images.load(profile.image, function (err, bitmap) {
                if (err) {
                    throw err;
                }

                this._profile.image = bitmap;
                this._initConverters();
            }.bind(this));
            
            return;
        }
        
        this._initConverters();
    }
    
    _initConverters() {
        const services = this._config;
        const profile = this._profile;
        
        const keys = Object.keys(services).filter((key) => services[key].enabled);
        let count = 0;

        const callback = function (err) {
            if (err) {
                return console.warn('%s generated an error: %s', this, err);
            }
            
            if (++count >= keys.length) {
                console.log('Success! Changed your data in %s accounts', count);
                
                //process.exit();
            }
        };
        
        keys.forEach(function (name) {
            // Check for custom imports in the future (v8+ and ES6)
            const converter = require('./services/' + name).Class(name);
            
            converter.setConfig(services[name]);
            converter.setProfile(profile);
            
            converter.start(callback.bind(name));
        });
    }
}

module.exports = Instaupdate;
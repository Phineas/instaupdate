import {Service} from '../service';

const baseUrl = 'https://api.twitter.com/1.1/account/';

class Twitter extends Service {
    buildRequest(builder) {
        let config = this.config;

        this.request = builder({
            oauth: {
                consumer_key: config.consumerKey,
                consumer_secret: config.consumerSecret,
                token: config.accessTokenKey,
                token_secret: config.accessTokenSecret
            }
        });
    }

    process() {
        const data = this.profile;
        
        let reach = 1;
        let count = 0;
        
        const callback = function (err, res, body) {
            let invalid = super._invalidRes(err, res, body);
            
            if (invalid) {
                count = 3;
                return super._callback(err);
            }

            if (++count === reach) {
                super._callback();
            }
        };

        this.request.post(baseUrl + 'update_profile.json', {
            name: data.name,
            url: data.url,
            location: data.location,
            description: data.description,
            profile_link_color: data.profileColor
        }, callback);

        if (data.image) {
            reach++;
            this._changeImage(callback, data.image);
        }

        // TODO Change banner
    }
    
    _changeImage(callback, image) {
        this.request.post(baseUrl + 'update_profile_image.json', {image}, callback);
    }
}


export {Twitter as Class};
import {Service} from '../service';

const baseUrl = 'https://discordapp.com/api/';

class Discord extends Service {
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
        let image = this.profile.image;
        
        if (!image) {
            return this._callback('No image provided!');
        }
        
        const data = {
            avatar: image
        };

        this.request.patch({
            url: baseUrl + 'users/{@me}'
        }, data, super._handleRes);
    }
}

export {Discord as Class};
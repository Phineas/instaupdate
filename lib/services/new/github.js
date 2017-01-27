import {Service} from '../service';

const baseUrl = 'https://api.github.com/';

class GitHub extends Service {
    buildRequest(builder) {
        let config = this.config;
        
        this.request = builder({
            auth: {
                user: config.user,
                pass: config.personalAccessToken
            }
        }, {
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
        });
    }

    process() {
        const params = JSON.stringify({
            name: data.name,
            blog: data.url,
            location: data.location,
            bio: data.description
        });

        this.request.patch({
            url: baseUrl + 'user',
            body: params
        }, super._handleRes);
    }
}

exports.Class = GitHub;
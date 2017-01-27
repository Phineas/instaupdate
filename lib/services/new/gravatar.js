import {Service} from '../service';

import * as crypto from 'crypto';
import * as xmlrpc from 'xmlrpc';

class Gravatar extends Service {
    buildRequest() {
        const email = this._hashAddress();
        
        const clientSettings = {
            host: 'secure.gravatar.com',
            path: '/xmlrpc?user=' + email,
            port: 443
        };

        this._client = xmlrpc.createSecureClient(clientSettings);
    }

    process() {
        const args = {
            password: this.config.password,
            userimage: this.profile.image,
        };
        
        this._getAddresses(function (err, addresses) {
            if (err) {
                return super._callback(err);
            }
            
            args.addresses = addresses;
            
            
            this._call('grav.useUserimage', args, this._callback);
        }.bind(this));
    }
    
    _hashAddress() {
        return crypto.createHash('md5').update(this.config.email).digest('hex');
    }
    
    _getAddresses(callback) {
        return this._call('grav.addresses', {password: this.config.password}, callback);
    }
    
    _call(method, data, callback) {
        if (this._client) {
            this._client.methodCall(method, [data], callback);
        }
    }
}

exports.Class = Gravatar;
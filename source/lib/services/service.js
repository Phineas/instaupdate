import * as Request from '../requestBuilder';

class Service {
    constructor(id) {
        this.id = id;
    }
    
    setConfig(config) {
        this.config = config;
    }

    setProfile(profile) {
        this.profile = profile;
    }
    
    start(callback) {
        this.cb = callback;
        
        if (!this.config || !this.profile) {
            return this._callback('Unitialized config');
        }
        
        this.buildRequest(Request);
        this.process();
    }
    
    process() {}
    
    buildRequest(builder) {}
    
    _invalidRes(err, res, body) {
        if (err) {
            return err;
        }
        
        let code = res.statusCode;
        
        if (code < 200 || code > 299) {
            return 'Invalid res code: ' + code;
        }

        let errs = body['errors'];

        if (errs !== undefined) {
            return body['message'] || errs || true;
        }
    }
    
    _handleRes(err, res, body) {
        const value = this._invalidRes(err, res, body);

        this._callback(value);
    }
    
    _callback(err) {
        if (this.cb) {
            this.cb(err);
        }
    }
}

exports.Service = Service;
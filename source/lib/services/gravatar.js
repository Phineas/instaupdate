const config = require('../../data/config.json').gravatar;

const crypto = require('crypto');
const xmlrpc = require('xmlrpc');

exports.change = function (data, callback) {
    if (!data.image) {
        return callback('Missing image');
    }
    
    let email = getEmailHash(config.email);
    
    const clientSettings = {
        host: 'secure.gravatar.com',
        path: '/xmlrpc?user=' + email,
        port: 443
    };
    
    const client = xmlrpc.createSecureClient(clientSettings);
    
    // Grab email addresses first
    getAddresses(client, function (err, addresses) {
        if (err) {
            return callback(err);
        }

        const args = {
            password: config.password,
            userimage: data.image,
            addresses: addresses
        };
        
        client.methodCall('grav.useUserimage', [args], callback);
    });
};

function getEmailHash(email) {
    return crypto.createHash('md5').update(email).digest('hex');
}

function getAddresses(client, callback) {
    client.methodCall('grav.addresses', [{password: config.password}], callback);
}
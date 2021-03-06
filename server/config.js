var path = require( 'path' ),
    fs = require( 'fs-extra' ),
    _ = require( 'underscore' );

var basic = {
    root: path.normalize( __dirname ),
    cache: path.normalize( __dirname + '/../cache' ),
    upload: path.normalize( __dirname + '/../upload' )
};

var config = {

    development: _.extend( {
        
        type: 'development',
        port: process.env.ENEN_PORT || 3000,
        ip: process.env.ENEN_IP,
        db: fs.existsSync( __dirname + '/database.development' ) ? fs.readFileSync( __dirname + '/database.development', 'utf8' ).trim( ) : ''

    }, basic ),

    testing: {},

    production: _.extend( {

        type: 'production',
        port: process.env.ENEN_PORT || 8008,
        ip: process.env.ENEN_IP,
        db: fs.existsSync( __dirname + '/database.production' ) ? fs.readFileSync( __dirname + '/database.production', 'utf8' ).trim( ) : ''

    }, basic ),
    
};

module.exports = function( type ) {
    return config[ type || process.env.NODE_ENV || 'development' ];
};

module.exports.data = config;

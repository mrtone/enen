var express = require( 'express' ),
    passport = require( './passport' ),
    mongoStore = require( 'connect-mongo' )( express ),
    MemStore = express.session.MemoryStore;

module.exports = function( enen ){

    var app = express( );

    app.set( 'showStackError', true );
    app.set( 'views', config.root + '/../view/' + enen.site.view );
    app.set( 'view engine', 'jade' );

    app.locals( enen );
    
    app.use( express.compress( ) );
    app.use( express.cookieParser( ) );
    app.use( express.json( ) );
    app.use( express.urlencoded( ) );
    app.use( express.methodOverride( ) );

    if( config.type === 'development' ){
        app.use( express.logger( 'dev' ) );
        app.use( express.session( {
            secret: 'secret_key',
            store: MemStore( { reapInterval: 60000 * 10 } ) } 
        ) );
    }else{        
        app.use( express.session( {
            secret: 'qazwsx',
            store: new mongoStore( {
                url: config.db,
                collection : 'sessions'
            } )
        } ) );
    }

    app.use( passport.initialize( ) );
    app.use( passport.session( ) );

    app.use( app.router );

    app.use( express.static( config.root + '/../public' ) );

    if ( config.type === 'development' ) {
        app.use( '/client', express.static( config.root + '/../client' ) );
    }
    app.use( '/bower_components', express.static( config.root + '/../bower_components' ) );
    app.use( '/', express.static( config.root + '/../dist' ) );

    app.use( function( err, req, res, next ){
        if ( err.message ) {
            // TODO: 不同的错误页面
            res.send( err.message, err.msg );
        }
    } );

    app.use( function( req, res, next ){
        res.send( 404 );
    } );

    app.param( function( name, fn ){
        if ( fn instanceof RegExp ) {
            return function( req, res, next, val ){
                var captures;
                if ( captures = fn.exec( String( val ) ) ) {
                    req.params[ name ] = captures;
                    next( );
                } else {
                    next( 'route' );
                }
            }
        }
    } );

    app.param( 'id', /^[a-z0-9]{24}$/ );
    app.param( 'page', /^\d$/ );

    require( './api' )( app, passport );
    require( './router' )( app );

    config.ip ? app.listen( config.port, config.ip ) : app.listen( config.port );

    return app;

};
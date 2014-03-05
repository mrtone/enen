var mongoose = require( 'mongoose' ),

    Schema = mongoose.Schema,
    crypto = require( 'crypto' );


var EnEnSchema = new Schema( {

    site: {},
    email: {},
    auth: {}

} );

EnEnSchema.set( 'toJSON',  {
    transform: function( doc, ret, options ) {
        delete ret.__v;
        delete ret._id;
        return ret;
    }
} );

EnEnSchema.statics = {

    load: function ( id, cb ) {
        this.findById( id ).exec( cb );
    }

};

mongoose.model( 'enen', EnEnSchema, 'enen' );

module.exports = function( callback ){

    var Model = mongoose.model( 'enen' );

    Model.count( function( err, num ){

        if( num < 1 ){
            var enen = new Model( {
                site: {
                    name: '嗯嗯',
                    view: 'enen',
                    dashboard: '/enen'
                },
                email: {
                    hosts: 'smtp.exmail.qq.com',
                    port: 25,
                    name: 'QQ',
                    username: 'username@example.com',
                    password: 'password',
                    nickname: 'nickname'
                },
                auth: {
                    baidu: {
                        clientID: 'clientID',
                        clientSecret: 'clientSecret',
                        callbackURL: 'callbackURL'
                    }
                }
            } );

            callback( enen.toJSON( ) );

        }else{

            Model.findOne( function( err, result ){
                callback( result.toJSON( ) );
            } );

        }

    } );

};
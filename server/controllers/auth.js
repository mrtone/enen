var Github = require( 'github-api' );

// 作者
exports.author = function ( req, res, next ){

    if( req.result.author._id.toString( ) === req.user._id.toString( ) ){
        next( );
    }else{
        next( error( 401, '无权限删除' ) );
    }

};

// Github
exports.github = function( req, res, next ){

    if( req.user.github ){
        req.github = req.github || new Github( {
            auth: 'oauth',
            token: req.user.github.token
        } );
        next( );
    }else{
        next( error( 401, '用户尚未绑定Github帐号！' ) );
    }

};

// 登录
exports.yes = function ( req, res, next ){
    
    if( req.isAuthenticated( ) ){
        next( );
    }else{
        next( error( 401, '请登录' ) );
    }

};

// 未登录
exports.no = function ( req, res, next ){
    
    if( !req.isAuthenticated( ) ){
        next( );
    }else{
        next( error( 401, '您已登录' ) );
    }

};
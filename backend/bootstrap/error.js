'use strict';
module.exports = function(ctx, statusCode, error){
    let response =  { status: statusCode};
    switch(statusCode){
        case 404:
            response.message = 'URL Not found';
            break;
        
        case 500:
            response.message = 'Internal Server Error';
            break;

        default:
            response.message = 'Unknown error';
            break;
    }
    ctx.body = response;
}
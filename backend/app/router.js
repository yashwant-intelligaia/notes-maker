'use strict';
const Router = require('koa-router');
module.exports = function(app){
    const router = new Router({prefix: '/api'});
    router.get('/', (ctx) => {
        ctx.body = 'hello world';
        // ctx.throw(500,'Not found');
    });
    app.use(router.routes()).use(router.allowedMethods());
}
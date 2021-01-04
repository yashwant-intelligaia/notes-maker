const koa = require('koa');
const app = new koa();
const serve = require('koa-static');
require('dotenv').config();
const port = process.env.PORT || 4000;
require('./bootstrap/graphql')(app);
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    err.status = err.statusCode || err.status || 500;
    require('./bootstrap/error')(ctx, err.status, err);
  }
});
app.use(serve('./public'));
require('./app/router')(app);
require('./bootstrap/mongoose')(app);
require('./bootstrap/socket')(app);

app.listen(port, () => {
  console.log(`Server started at port: ${port}`)
});
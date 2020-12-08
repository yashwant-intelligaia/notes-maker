const Koa = require('koa');
const app = new Koa();
require('dotenv').config(); 
const port = process.env.PORT||4000;
app.use(async ctx => {
  ctx.body = {message:'Hello World'};
});

app.listen(port, ()=>{
  console.log(`Server started at port: ${port}`)
});
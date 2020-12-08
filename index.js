const koa = require('koa');
const app = new koa();
require('dotenv').config();
const port = process.env.PORT;
app.use(async ctx =>{
  ctx.body = {message: "Hello World"}
})

app.listen(port, ()=>{
  console.log(`Server started at port: ${port}`)
});
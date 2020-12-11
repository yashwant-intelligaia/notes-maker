import { resolvers } from './resolver.js';
import { typeDefs } from './typeDef.js'
import { ApolloServer } from 'apollo-server-koa';
import koa from 'koa';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const startServer = async () => {
  const app = new koa();
  const port = process.env.PORT||4000;
  const dbUrl = process.env.DB_URL||"mongodb://localhost:27017";
  const dbName = process.env.DB_NAME;

  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  server.applyMiddleware({ app });

  await mongoose.connect((dbUrl+"/"+dbName), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });

  app.use(async ctx => {
    ctx.body = { message: "Hello World", path: server.graphqlPath }
  })

  app.listen(port, () => {
    console.log(`Server started at port: ${port}`)
  });
};

startServer();
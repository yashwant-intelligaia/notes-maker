import { resolvers } from './resolver.js';
import { typeDefs } from './typeDef.js'
import { ApolloServer } from 'apollo-server-koa';
import koa from 'koa';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const startServer = async () => {
  const app = new koa();
  const port = process.env.PORT;

  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  server.applyMiddleware({ app });

  await mongoose.connect("mongodb://localhost:27017/notes", {
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
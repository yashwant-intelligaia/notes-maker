const resolvers = require('../config/resolver');
const typeDefs = require('../config/typeDef');
const { ApolloServer } = require('apollo-server-koa');

module.exports = async function (app) {
    const server = new ApolloServer({ typeDefs, resolvers });
    server.applyMiddleware({ app });
}
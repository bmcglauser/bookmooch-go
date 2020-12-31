// @ts-nocheck
const { ApolloServer } = require('apollo-server');
const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');

const server = new ApolloServer(
  {
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization && req.headers.authorization.replace('Bearer ', '') || '';
    return { token }
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
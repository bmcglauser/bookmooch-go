const { ApolloServer } = require('apollo-server');
const { resolvers } = require('./resolvers/typeResolvers');
const { typeDefs } = require('./typedefs/typeDefs');

const server = new ApolloServer({ typeDefs, resolvers });



server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
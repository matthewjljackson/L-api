import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { schema } from './graphql/schema';
import http from 'http';
import { createContext } from './graphql/context';

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema,
    context: createContext
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer();
import { PrismaClient } from '@prisma/client';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { schema } from './graphql/schema';

const PORT = 4000;
const prisma = new PrismaClient();

const apollo = new ApolloServer({
  context: () => ({ prisma }),
  schema
});

const app = express();

apollo.applyMiddleware({ app });
app.listen(PORT, () => {
  console.log(`GraphQL service ready at http://localhost:${PORT}/graphql`)
})
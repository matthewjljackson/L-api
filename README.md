# L-api

### Getting Started

1. Install the required dependencies.
2. Add a .env file and set up with [PostgreSQL](https://www.postgresql.org/).
3. Seed the database with the following commands:

- `npx prisma db push`
- `npx prisma db seed`
- `npx prisma studio`

4. Run with `npm run dev`.
5. Open Apollo Studio in your browser at http://localhost:4000/graphql to view and test available mutations/queries.

### Technologies

- Typescript with GraphQL as instructed
- Express: selected for suitability and familiarity plus ease of use in a short time frame.
- Prisma: selected for familiarity and it was tool that is being considered in the workplace.
- Nexus: selected for creating a typesafe, code first GraphQL schema.

### Design

1. I focused on meeting the requirements of the technical test.
2. If I had more time I would like to have added this to a nextjs app with testing.

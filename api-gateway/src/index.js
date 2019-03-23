import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import makeSchema from './schema';

dotenv.config();

const PORT = process.env.PORT || 3000;

const startGateway = async () => {
	const schema = await makeSchema();

	const server = new ApolloServer({ schema });

	const app = express();
	server.applyMiddleware({ app });
	/* eslint-disable no-console */
	app.listen({ port: PORT }, () => console.log(`💀  Server ready at http://localhost:${PORT}${server.graphqlPath}`));
};

startGateway();

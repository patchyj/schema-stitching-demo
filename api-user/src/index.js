/* eslint-disable consistent-return */
/* eslint-disable no-console */
import express from 'express';
import jwt from 'jsonwebtoken';
import { ApolloServer } from 'apollo-server-express';
import config from '../config/config';
import typeDefs from './schema/userSchema';
import resolvers from './resolver/userResolver';

const { PORT, SECRET } = config || 4001;

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		if (
			req.headers.authorization
      && req.headers.authorization.includes('Bearer')
		) {
			const token = req.headers.authorization.split(' ').reverse()[0];
			const decoded = await jwt.verify(token, SECRET);

			return {
				user: decoded
			};
		}
	}
});

const app = express();
server.applyMiddleware({ app });
/* eslint-disable no-console */
app.listen({ port: PORT }, () => console.log(`\n 💀  User server ready at http://localhost:${PORT}${server.graphqlPath} \n`));

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import passport from 'passport';
import makeSchema from './schema';

dotenv.config();

const PORT = process.env.PORT || 3000;

const startGateway = async () => {
	const schema = await makeSchema();

	const app = express();
	
	passport.initialize();

	app.use('/graphql', (req, res, next) => {
		// eslint-disable-next-line no-unused-vars
		passport.authenticate('jwt', { session: false }, (err, user, info) => {
			if (user) req.user = user;

			next();
		})(req, res, next);
	});

	const server = new ApolloServer({
		schema,
		context: ({ req }) => ({
			user: req.user
		})
	});

	server.applyMiddleware({ app });
	/* eslint-disable no-console */
	app.listen({ port: PORT }, () => console.log(`💀  Server ready at http://localhost:${PORT}${server.graphqlPath}`));
};

startGateway();

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import passport from 'passport';
import makeSchema from './schema';
import config from '../config/config';
import passportConfig from '../config/passport';
import errorHandler from '../error-handling/errorHandler';

passportConfig(passport);

const { PORT } = config || 3000;

const startGateway = async () => {
	const schema = await makeSchema();
	const app = express();

	// console.log(schema)

	app.use(passport.initialize());

	app.use('/graphql', (req, res, next) => {
		// eslint-disable-next-line no-unused-vars
		passport.authenticate('jwt', { session: false }, (err, user, info) => {
			if (user) req.user = user;
			// eslint-disable-next-line no-console
			next();
		})(req, res, next);
	});

	const server = new ApolloServer({
		schema,
		context: ({ req }) => ({ authScope: req.headers.authorization }),
		formatError: (err) => {
			const formattedErrors = errorHandler(true)(err);

			return formattedErrors;
		}
	});

	server.applyMiddleware({ app });
	/* eslint-disable no-console */
	app.listen({ port: PORT }, () => console.log(`\n 💀  Server ready at http://localhost:${PORT}${server.graphqlPath} \n`));
};

startGateway().catch(err => console.log(err));

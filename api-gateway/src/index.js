/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import passport from 'passport';
import makeSchema from './schema';
import config from '../config';
import passportConfig from '../config/passport';

passportConfig(passport);

const { PORT } = config || 3000;

const startGateway = async () => {
	const schema = await makeSchema();
	const app = express();

	app.use(passport.initialize());

	// STANDARD EXPRESS MIDDLEWARE
	app.post('/graphql', (req, res, next) => {
		// eslint-disable-next-line no-unused-vars
		passport.authenticate(
			'jwt', // STRATEGY
			{ session: false }, // WE AREN'T USING SESSION STORAGE
			(err, user, info) => { // IF THIS FUNCTION CALLED THEN AUTHENTICATION SUCCESSFUL
				console.log(user); // WILL RETURN THE JWT_PAYLOAD from ../config/passport.js
				if (user) req.user = user;
				// eslint-disable-next-line no-console
				next();
			})(req, res, next);
	});

	const server = new ApolloServer({
		schema,
		context: ({ req }) => ({ authorization: req.headers.authorization })
	});

	server.applyMiddleware({ app });
	/* eslint-disable no-console */
	app.listen({ port: PORT }, () => console.log(`\n 💀  Gateway server ready at http://localhost:${PORT}${server.graphqlPath} \n`));
};

startGateway().catch(console.error);

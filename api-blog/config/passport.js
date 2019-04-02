import passportJWT from 'passport-jwt';
import mongoose from 'mongoose';
import config from './config';
import Blog from '../src/models/Blog';

const { Strategy, ExtractJwt } = passportJWT;

mongoose.Promise = require('bluebird');

mongoose.connect(
	config.USER_DB,
	{ useNewUrlParser: true }
);

export const params = {
	secretOrKey: config.SECRET,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

export const strategy = new Strategy(params, (payload, done) => {
	Blog.findById(payload.id)
		.then((blog) => {
			if (blog) {
				return done(null, blog);
			}
			return done(null, false);
		})
		.catch((err) => {
			// eslint-disable-next-line no-console
			console.log(err);
		});

	// return done(null, blog);
});

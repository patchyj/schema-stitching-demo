import passportJWT from 'passport-jwt';
import config from './config';

const { Strategy, ExtractJwt } = passportJWT;

export default (passport) => {
	const opts = {
		secretOrKey: config.SECRET,
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
	};
	passport.use(new Strategy(opts, ((jwt_payload, done) => {
		done(null, { message: 'auth' });
	})));
};

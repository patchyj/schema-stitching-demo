import passportJWT from 'passport-jwt';

const { SECRET, USER_DB } = process.env;
const { Strategy, ExtractJwt } = passportJWT;

export const params = {
	secretOrKey: SECRET,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

export const strategy = new Strategy(params, (payload, done) => {
	const user = users.find(user => user.id === payload.id) || null;

	return done(null, user);
});

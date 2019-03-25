import passportJWT from 'passport-jwt';
import mongoose from 'mongoose';
import config from './config';
import User from '../src/models/User';

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
  User.findById(payload.id)
    .then((user) => {
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });

  return done(null, user);
});

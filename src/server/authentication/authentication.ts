import passportJwt from 'passport-jwt';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import { findHousehold } from '../utils/mongo-utils';

const secret = 'secret';

const jwtOptions: passportJwt.StrategyOptions = {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};

const jwtStrategy = new passportJwt.Strategy(jwtOptions, async (payload, next) => {
    const household = await findHousehold({ email: payload.email });
    next(undefined, household);
});

passport.use(jwtStrategy);

export const passportAuthentication = () => passport.initialize();

export const authenticate = () => passport.authenticate('jwt', { session: false, failWithError: true });

export const generateToken = function (email: string) {
    return jwt.sign({ email }, secret);
};
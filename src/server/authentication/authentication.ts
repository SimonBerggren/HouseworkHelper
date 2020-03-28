import passportJwt from 'passport-jwt';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import UserModel from '../model/user-model';

import { findHousehold } from '../utils/mongo-utils';

const secret = 'secret';

const jwtOptions: passportJwt.StrategyOptions = {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};

const jwtStrategy = new passportJwt.Strategy(jwtOptions, async (payload, next) => {
    const household = await findHousehold({ email: payload.email });
    if (household) {
        const user = await UserModel.findOne({ householdID: household.id, userName: payload.userName });

        next(undefined, { household, user });
    }
});

passport.use(jwtStrategy);

export const passportAuthentication = () => passport.initialize();

export const authenticate = () => passport.authenticate('jwt', { session: false, failWithError: true });

export const generateEmailToken = function (email: string) {
    return jwt.sign({ email }, secret);
};

export const generateUserToken = function (email: string, userName: string) {
    return jwt.sign({ email, userName }, secret);
};
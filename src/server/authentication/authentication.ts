import passportJwt from 'passport-jwt';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import { Document as IDocument } from 'mongoose';

import { findHousehold } from '../model/household-model';
import { findUser } from '../model/user-model';

const secret = 'secret';

const jwtOptions: passportJwt.StrategyOptions = {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};

const jwtStrategy = new passportJwt.Strategy(jwtOptions, async (payload, next) => {
    const household = await findHousehold(payload.email);
    if (household) {
        const user = payload.userName && await findUser(household.id, payload.userName);

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

export const getHousehold = (request: Express.Request) => (request.user as any).household as Household & IDocument;
export const getHouseholdID = (request: Express.Request): string => getHousehold(request).id;

export const getUser = (request: Express.Request) => (request.user as any).user as User & IDocument;
export const getUserName = (request: Express.Request): string => getUser(request).userName;
export const getUserID = (request: Express.Request): string => getUser(request).id;
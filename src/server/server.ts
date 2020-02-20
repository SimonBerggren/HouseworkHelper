import passportJwt from 'passport-jwt';
import passport from 'passport';
import express from 'express';
import path from 'path';

import CompletedTaskController from './controllers/completed-task-controller';
import HouseholdController from './controllers/household-controller';
import SignupController from './controllers/signup-controller';
import LoginController from './controllers/login-controller';
import UserController from './controllers/user-controller';
import TaskController from './controllers/task-controller';
import HouseholdModel from './model/household-model';
import connect from './mongo';

// @ts-ignore
// eslint-disable-next-line no-unused-vars
const handleError = (err, req, res, _next) => {
    var output = {
        error: {
            name: err.name,
            message: err.message,
            text: err.toString()
        }
    };
    var statusCode = err.status || 500;
    res.status(statusCode).json(output);
};

connect()
    .then(() => {
        const port = process.argv.pop();
        const app = express();

        const jwtOptions: passportJwt.StrategyOptions = {
            jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secret'
        };

        const jwtStrategy = new passportJwt.Strategy(jwtOptions, async (payload, next) => {
            HouseholdModel.findOne({ email: payload.email })
                .then(model => next(null, model));
        });

        app.use(express.json());
        app.use(express.static(path.resolve('dist', 'client')));

        passport.use(jwtStrategy);
        app.use(passport.initialize());

        app.use('/api/completed-task', CompletedTaskController);
        app.use('/api/household', HouseholdController);
        app.use('/api/signup', SignupController);
        app.use('/api/login', LoginController);
        app.use('/api/task', TaskController);
        app.use('/api/user', UserController);

        app.use([handleError]);

        app.use('*', (_req, res) => res.sendFile(path.resolve('dist', 'client', 'index.html')));

        app.listen(port, () => console.info(`Up and running on port ${port}`));

    })
    .catch(error => {
        console.error(error);
        process.exit(-1);
    });

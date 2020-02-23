import express from 'express';
import path from 'path';

import CompletedTaskController from './controllers/completed-task-controller';
import HouseholdController from './controllers/household-controller';
import SignupController from './controllers/signup-controller';
import LoginController from './controllers/login-controller';
import UserController from './controllers/user-controller';
import TaskController from './controllers/task-controller';
import connect from './mongo';

import { passportAuthentication } from './authentication/authentication';

// @ts-ignore
// eslint-disable-next-line no-unused-vars
const handleError = (err, _req, res, _next) => {
    var statusCode = err.status || 500;
    res.status(statusCode).json(err.message);
};

const staticPath = path.resolve('dist', 'client');
const appPath = path.resolve(staticPath, 'index.html');

connect()
    .then(() => {
        const port = process.argv.pop();
        const app = express();

        app.use(express.json());
        app.use(express.static(staticPath));

        app.use(passportAuthentication());

        app.use('/api/completed-task', CompletedTaskController);
        app.use('/api/household', HouseholdController);
        app.use('/api/signup', SignupController);
        app.use('/api/login', LoginController);
        app.use('/api/task', TaskController);
        app.use('/api/user', UserController);

        app.use([handleError]);

        app.use('*', (_req, res) => res.sendFile(appPath));

        app.listen(port, () => console.info(`Up and running on port ${port}`));

    })
    .catch(error => {
        console.error(error);
        process.exit(-1);
    });

import express from 'express';
import path from 'path';
import cors from 'cors';

import CompletedTaskController from './controllers/completed-task-controller';
import RedeemRewardController from './controllers/redeemed-reward-controller';
import HouseholdController from './controllers/household-controller';
import RequestController from './controllers/request-controller';
import RewardController from './controllers/reward-controller';
import SignupController from './controllers/signup-controller';
import LoginController from './controllers/login-controller';
import UserController from './controllers/user-controller';
import TaskController from './controllers/task-controller';
import connect from './mongo';

import { passportAuthentication } from './authentication/authentication';
import { handleError, handleTrailingSlash } from './utils/server-utils';
import { getIP } from './utils/ip-utils';

const staticPath = path.resolve('dist', 'client');
const appPath = path.resolve(staticPath, 'index.html');

connect()
    .then(() => {
        const port = process.argv.pop();
        const app = express();
        const ip = getIP();

        app.use(
            cors(),
            express.json(),
            express.static(staticPath),
            passportAuthentication(),
            handleError,
            handleTrailingSlash
        );

        app.use('/api/completed-task', CompletedTaskController);
        app.use('/api/redeemed-reward', RedeemRewardController);
        app.use('/api/household', HouseholdController);
        app.use('/api/request', RequestController);
        app.use('/api/signup', SignupController);
        app.use('/api/reward', RewardController);
        app.use('/api/login', LoginController);
        app.use('/api/task', TaskController);
        app.use('/api/user', UserController);

        app.use('/api/*', (_req, res) => res.status(404).send());

        app.use('*', (_req, res) => res.sendFile(appPath));

        app.listen(port, () => console.info(`Up and running on port ${ip}`));

    })
    .catch(error => {
        console.error(error);
        process.exit(-1);
    });

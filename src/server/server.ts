import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';

import SignupController from './controllers/signup-controller';
import connect from './mongo';

connect()
    .then(() => {

        const port = process.argv.pop();
        const app = express();

        app.use(bodyParser.json());

        app.use(express.static(path.resolve('dist', 'client')));
        
        app.use('/api/signup', SignupController);
        
        app.use('*', (_req, res) => res.sendFile(path.resolve('dist', 'client', 'index.html')));
        
        
        app.listen(port, () => console.info(`Up and running on port ${port}`));

    })
    .catch(error => {
        console.error(error);
        process.exit(-1);
    });

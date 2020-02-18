import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';

import signupController from './controllers/signup-controller';

const port = process.argv.pop();
const app = express();

app.use(bodyParser.json());

app.use('/signup', signupController);

app.use(express.static(path.resolve('dist', 'client')));

app.use('*', (req, res) => res.sendFile(path.resolve('dist', 'client', 'index.html')));

app.listen(port, () => console.info(`Up and running on port ${port}`));
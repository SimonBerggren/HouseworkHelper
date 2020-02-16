import express from 'express';
import path from 'path';

const port = process.argv.pop();
const app = express();

app.use(express.static(path.resolve('dist', 'client')));

app.use('*', (req, res) => res.sendFile(path.resolve('dist', 'client', 'index.html')));

app.listen(port, () => console.log(`Up and running on port ${port}`));
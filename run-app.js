const { spawn } = require('child_process');

const serverPort = 80;
const clientPort = 8080;
const portArgs = [`--env.serverPort=${serverPort}`, `--env.clientPort=${clientPort}`];

const terminal = 'urxvt';
const terminalArgs = ['-e'];

const args = [...terminalArgs, 'npm', 'run'];

const run = (script) =>
    spawn(
        terminal,
        [...args, script, '--', ...portArgs],
        {
            stdio: ['ignore', 'inherit', 'inherit'],
            detached: true
        }
    );

run('start-server');

run('start-client');

process.exit();
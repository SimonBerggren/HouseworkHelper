const { spawn } = require('child_process');

const terminal = 'urxvt';
const terminalArgs = ['-e'];

const args = [...terminalArgs, 'npm', 'run'];

const run = (script) =>
    spawn(
        terminal,
        [...args, script, '--', '--env.proxy'],
        {
            stdio: ['ignore', 'inherit', 'inherit'],
            detached: true
        }
    );

run('start-server');

run('start-client');

process.exit();
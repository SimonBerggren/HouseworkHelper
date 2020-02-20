const { spawn } = require('child_process');

const terminal = 'urxvt';
const terminalArgs = ['-e'];
const keepTerminalOpen = ['&&', terminal];

const run = (...args) =>
    spawn(
        terminal,
        [...terminalArgs, ...args, ...keepTerminalOpen],
        {
            stdio: ['ignore', 'inherit', 'inherit'],
            detached: true,
            shell: true
        }
    );

const runScript = (script, ...args) =>
    run('npm', 'run', script, '--', ...args);

runScript('start-mongo');

runScript('start-server');

runScript('start-client');

process.exit();
const { spawn } = require('child_process');

const terminal = 'urxvt';
const terminalArgs = ['-e'];

const run = (...args) =>
    spawn(
        terminal,
        [...terminalArgs, ...args, '&'],
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

runScript('start-client', '--env.proxy');

process.exit();
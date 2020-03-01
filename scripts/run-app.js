const { spawn } = require('child_process');

let terminal = 'cmd';
let terminalArgs = ['/K'];
let keepTerminalOpen = [];

if (process.platform !== 'win32') {
    terminal = 'urxvt';
    terminalArgs = ['-e'];
    keepTerminalOpen = ['&&', terminal];
}

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
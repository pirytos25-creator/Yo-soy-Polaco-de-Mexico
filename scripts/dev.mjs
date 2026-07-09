import { spawn } from 'node:child_process';
import process from 'node:process';

const isWindows = process.platform === 'win32';

const commands = [
  {
    name: 'serwer',
    command: isWindows ? 'npm.cmd' : 'npm',
    args: ['run', 'dev:server'],
  },
  {
    name: 'wrota',
    command: isWindows ? 'npm.cmd' : 'npm',
    args: ['run', 'dev:client'],
  },
];

const children = commands.map(({ name, command, args }) => {
  const child = spawn(command, args, {
    stdio: ['inherit', 'pipe', 'pipe'],
    shell: isWindows,
    env: process.env,
  });

  child.stdout.on('data', (data) => process.stdout.write(`[${name}] ${data}`));
  child.stderr.on('data', (data) => process.stderr.write(`[${name}] ${data}`));
  child.on('exit', (code) => {
    if (code && code !== 0) {
      process.stderr.write(`[${name}] ścieżka przerwana z kodem ${code}\n`);
      stopAll(code);
    }
  });

  return child;
});

function stopAll(code = 0) {
  for (const child of children) {
    if (!child.killed) child.kill('SIGTERM');
  }
  process.exit(code);
}

process.on('SIGINT', () => stopAll(0));
process.on('SIGTERM', () => stopAll(0));

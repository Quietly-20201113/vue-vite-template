#!/usr/bin/env node

const { spawn } = require('child_process');
const { join } = require('path');

const TEMPLATE_DIR = join(__dirname, '..', 'template');

const args = process.argv.slice(2);

const command = 'npx';
const commandArgs = [
  'create-vite-app',
  args[0],
  '--template',
  TEMPLATE_DIR,
];

spawn(command, commandArgs, { stdio: 'inherit' });

#!/usr/bin/env node
// @ts-check
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

const cmds = require('./cmds')


yargs(hideBin(process.argv))
  .command(cmds.serve)
  .command(cmds.topic)
  .demandCommand(1)
  .epilog('copyright 2020')
  .argv

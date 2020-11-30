#!/usr/bin/env node

const server = require('@cuser/server');

server({
  secret: '',
  port: process.env.PORT || 3000,
  cors: process.argv.includes('--cors') || false,
});

#!/usr/bin/env node

const { create } = require('ipfs');
const server = require('@cuser/server');

const node = create({
  EXPERIMENTAL: {
    ipnsPubsub: true,
  }
});

server(node, {
  secret: process.env.SECRET || '',
  port: process.env.PORT || 3000,
  host: process.env.HOST || '0.0.0.0',
  cors: process.argv.includes('--cors') || false,
});

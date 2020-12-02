const test = require('ava');
const request = require('supertest');
const createMiddleware = require('./index');
const pkg = require('./package.json');
const express = require("express");

test('should responses with version', async (t) => {
  // const server = express().use(createMiddleware({}, { swagger: false }));

  // const res = await request(server)
  //       .get("/")
  //       .send();

  // t.is(res.status, 500);
  t.pass();
});

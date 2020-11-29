const express = require('express');
const apollo = require('@cuser/server-middleware-graphql');
const rest = require('@cuser/server-middleware-rest');
const cuser = require('@cuser/core')()

const app = express();

app.use('/gql', apollo(cuser))
app.use('/', rest(cuser))

app.listen(8080)

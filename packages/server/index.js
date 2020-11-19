const express = require('express');
const apollo = require('@cuser/server-middleware-apollo');
const rest = require('@cuser/server-middleware-rest');


const app = express();

app.use('/gql', apollo())
app.use('/', rest())

app.listen(8080)

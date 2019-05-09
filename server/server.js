const express = require('express');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const path = require('path');

const config = require('config');
const tokenRoute = require('./route/token');

let port = config.get('server.port');
let app = express();

let basePath = __dirname.split(path.sep);
basePath.pop();

app.use(express.static(basePath.join(path.sep) + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.post('/token', tokenRoute.authenticate);

app.get('*', (request, response) => {
    response.sendFile(basePath.join(path.sep) + '/public/index.html');
});

app.listen(port, () => {
    console.log('server is listening on port ' + port)
});
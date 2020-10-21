const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');

const user = require('./router/user');

app.use(cors());
app.use(bodyParser.json());

app.use('/user', user);

app.listen(8080);
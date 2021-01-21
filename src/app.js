const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');
const {isConnected, tokenParser, role} = require('./middleware/auth');

const HttpError = require("./error/httpError");

app.use(cors());
app.use(bodyParser.json());
app.use(tokenParser());
app.use

const router = (route) => {
  return require('./router/' + route)
};

app.use('/auth', router('auth'));
app.use('/user', isConnected(), router('user'));
app.use('/item', router('item'));
app.use('/provider', isConnected(), role("Admin"), router('provider'));
/*
app.use('/config', router('config'));
*/

app.all('/*', () => {
  throw new HttpError('Invalid Url', 404);
});

app.use(require('./middleWare/error')())

app.listen(process.env.PORT || 3000);
const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');
const { isConnected, tokenParser, role } = require('./middleware/auth');

const { InvalidUrl } = require("./error/httpError");

app.use(cors());
app.use(bodyParser.json());
app.use(tokenParser());
app.use

const router = (router) => {
    return require('./router/' + router)
};

app.use('/auth', router('auth'));
app.use('/user', isConnected(), router('user'));
app.use('/item', router('item'));
app.use('/provider', isConnected(), role("Admin"), router('provider'));
app.use('/config', router('config'));

app.all('/*', () => {
    throw new InvalidUrl();
});

app.use(require('./middleWare/error')())

app.listen(process.env.PORT || 3000);
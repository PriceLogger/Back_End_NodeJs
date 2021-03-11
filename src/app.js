const express = require('express');
const app = express();
const cors = require('cors');
const { isConnected, tokenParser, role } = require('./middleware/auth');
const { InvalidUrl } = require("./error/httpError");

//middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(tokenParser());

//require router
const router = (router) => {
    return require('./router/' + router)
};

//route
app.use('/auth', router('auth'));
app.use('/user', isConnected(), router('user'));
app.use('/item', router('item'));
app.use('/provider', isConnected(), role(["Admin", "Worker"]), router('provider'));
app.use('/config', router('config'));

//default route 
app.all('/*', () => {
    throw new InvalidUrl();
});

//error route
app.use(require('./middleware/error')())

app.listen(process.env.PORT || 3000);
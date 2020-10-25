const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');

const auth = require('./router/auth')
const user = require('./router/user');
const provider = require('./router/provider');
const item = require('./router/item');
const config = require('./router/config');

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', auth);
app.use('/user', user);
app.use('/item', item);
app.use('/provider', provider);
app.use('/config', config);

app.all('/*', (req, res) => {
    res.status(404).json({
        err: {
            code: 404,
            message: 'You should not be here'
        }
    });
});


app.listen(8080);
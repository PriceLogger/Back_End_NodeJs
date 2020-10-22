const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');

const user = require('./router/user');
const item = require('./router/item');
const provider = require('./router/provider');

app.use(cors());
app.use(bodyParser.json());

app.use('/user', user);
app.use('/item', item);
app.use('/provider', provider);

app.all('/*', (req, res) => {
    res.status(404).json({
        err: {
            code: 404,
            message: 'You should not be here'
        }
    });
});


app.listen(8080);
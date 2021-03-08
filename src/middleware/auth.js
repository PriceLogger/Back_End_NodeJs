const jwt = require('jsonwebtoken');
const configJwt = require('../../config/jwt.json');
const { AuthError, PrivilegeError } = require('../error/httpError')

const tokenParser = () => {
    return async(req, res, next) => {
        if (req.headers && req.headers['authorization']) {
            jwt.verify(req.headers['authorization'], configJwt.key, (err) => {
                if (err) req.user = false;
                else req.user = jwt.decode(req.headers['authorization']);
            })
        } else {
            req.user = false
        }
        next();
    }
}

const isConnected = () => {
    return (req, res, next) => {
        if (req.user) next();
        else next(new AuthError());
    }
}

const role = (role) => {
    return (req, res, next) => {
        if (!req.user) next(new AuthError());

        else if (Array.isArray(role) && role.find((role) => req.user.role.toLowerCase() === role.toLowerCase())) next();
        else if (req.user.role.toLowerCase() === 'admin' || req.user.role.toLowerCase() === role.toLowerCase()) next();
        else next(new PrivilegeError());
    }
}

module.exports = { isConnected, tokenParser, role };
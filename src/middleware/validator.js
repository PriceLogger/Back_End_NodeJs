const { MissingBody, MissingFieldInBody, MissingArrayInBody } = require("../error/httpError");

const check = (field) => {
    return (req, res, next) => {
        let body = req.body;
        let correct = true;
        let missing = [];
        field.forEach(key => {
            if (!body.hasOwnProperty(key)) {
                missing.push(key);
                correct = false;
            }
        });
        if (correct) {
            next();
        } else {
            next(new MissingFieldInBody(missing))
        }
    }
}

const hasBody = () => {
    return (req, res, next) => {
        if (Object.keys(req.body).length === 0) {
            next(new MissingBody())
        } else {
            next();
        }
    }
}

const checkArray = () => {
    if (!Array.isArray(prices)) next(new MissingArrayInBody());
    else next();
}

const login = ['username', 'password'];
const newUser = ['username', 'password', 'confirmPassword', 'email'];

module.exports = {
    check,
    hasBody,
    login,
    newUser,
}
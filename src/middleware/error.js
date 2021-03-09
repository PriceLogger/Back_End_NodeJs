const { HttpError } = require('../error/httpError');

error = () => {
    return (err, req, res, next) => {
        if (!err) next();

        if (err instanceof HttpError) {
            if (!process.env.NODE_ENV || process.env.NODE_ENV === 'DEV') {
                console.error(err)
            }

            res.status(err.htmlCode).json({
                err: {
                    type: err.constructor.name,
                    code: err.htmlCode,
                    message: err.message,
                    ...err.data,
                }
            });
        } else {
            console.error(err.stack);
            res.status(500).json({
                err: {
                    code: 500,
                    message: err.message,
                }
            });
        }
    }
}

module.exports = error;
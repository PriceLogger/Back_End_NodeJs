class httpException extends Error {

    constructor(message, code){
        super(message)
        this.code = code;
    }

    toJSON = () => {
        return { err :
            {
                code : this.code,
                message : this.message
            }
        }
    }
}

module.exports = httpException;
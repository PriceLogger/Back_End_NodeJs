class HttpError extends Error {
    constructor(message) {
        super(message);
        this.htmlCode = 500;
    }
}

class InvalidUrl extends HttpError {
    constructor() {
        super('Invalid Url');
        this.htmlCode = 404;
    }
}

class CredentialError extends HttpError {
    constructor() {
        super('Wrong Credential');
        this.htmlCode = 403;
    }
}

class AuthError extends HttpError {
    constructor() {
        super('You are not authenticated');
        this.htmlCode = 403;
    }
}

class PrivilegeError extends HttpError {
    constructor() {
        super('You don\'t have enough privilege to be here');
        this.htmlCode = 403;
    }
}

class MalFormatedBody extends HttpError {
    constructor(message) {
        super(message || 'Malformated body');
    }
}

class MissingBody extends MalFormatedBody {
    constructor(missing) {
        super('No information given');
        this.htmlCode = 400;
        this.data = {...this.data, ... { missing: missing } }
    }
}

class MissingArrayInBody extends MalFormatedBody {
    constructor(type) {
        super('No array found in body');
        this.htmlCode = 400;
        this.data = {...this.data, ... { missing: 'Array of ' + type } }
    }
}

class MissingFieldInBody extends MalFormatedBody {
    constructor(missing) {
        super('Some required fields are not filled in');
        this.htmlCode = 400;
        this.data = {...this.data, ... { missing: missing } }
    }
}

module.exports = { HttpError, InvalidUrl, CredentialError, PrivilegeError, AuthError, MissingBody, MissingFieldInBody, MissingArrayInBody };
class HttpError extends Error {
  constructor(message, htmlCode, data) {
    super(message);
    this.htmlCode = htmlCode;
    this.data = data;
  }
}

module.exports = HttpError;
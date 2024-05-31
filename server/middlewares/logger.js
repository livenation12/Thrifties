const logger = (request, response, next) => {
        console.log(request.path, request.method);
        next();
}

module.exports = logger

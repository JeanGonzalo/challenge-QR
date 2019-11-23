const mongoose = require('mongoose');
const logger = require('../lib/logger');

function processError(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(next);
    }
}

function processDBError(err, req, res, next) {
    if (err instanceof mongoose.Error || err.name === 'MongoError') {
        logger.error('Ocurrió un error en la BD', err);
        err.message = 'Error en la BD';
        err.status = 500;
    }
    next(err);
}

function catchResolver(err, req, res, next) {
    console.log("res ->", res)
    console.log("err ->", err)
    res.status(err.status).send(err.message);
}

module.exports = {
    processError,
    processDBError,
    catchResolver,
}

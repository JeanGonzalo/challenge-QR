const logger = require('./logger');
const morgan = require('morgan');

function morganConfig(app) {
    app.use(morgan('short', {
        skip: function (req, res) {
            return res.statusCode >= 400;
        },
        stream: {
            write: message => logger.info(message.trim()),
        }
    }));

    app.use(morgan('short', {
        skip: function (req, res) {
            return res.statusCode < 400;
        },
        stream: {
            write: message => logger.error(message.trim()),
        }
    }));
}

module.exports = morganConfig;
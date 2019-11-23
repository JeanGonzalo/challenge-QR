const winston = require('winston');
const { createLogger, format, transports } = winston;
const { splat, combine, timestamp, printf } = format;

//Formato de salida personalizado
const customFormat = printf(({ timestamp, level, message, meta }) => {
  return `[${level}]: ${timestamp} - ${message} - ${meta ? JSON.stringify(meta) : ''}`;
});

const logger = createLogger({
  level: 'info',
  format: format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.File({
      level: 'info',
      handleExceptions: true,
      maxSize: 512000,
      maxFiles: 5,
      filename: `${__dirname}/log-de-aplicacion.log`,
      format: format.combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        splat(),
        customFormat,
      ),
    }),

    new transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      format: format.combine(
        format.colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        splat(),
        customFormat,
      ),
    })
  ]
});

module.exports = logger;

var clockwork = require('clockwork')({ key: '0799b80b7432364b91b84eafd68d11bedbdb144a' });
const logger = require('../lib/logger');

// Generar código de validación por SMS
function generateValidationCode() {

    const digits = '0123456789';
    let validationCode = '';

    for (let i = 0; i < 4; i++) {
        validationCode += digits[Math.floor(Math.random() * 10)];
    }
    return validationCode;
}

function sendValidationCode(cellphone, validationCode) {

    clockwork.sendSms({ To: cellphone, Content: `Tu código de validación es ${validationCode}` },
        function (error, resp) {
            if (error) {
                console.log('Something went wrong', error);
                logger.error('Error en el envío del código de validación');
            } else {
                console.log('Message sent', resp.responses[0].id);
                logger.info('Se envió correctamente el código de validación al número', cellphone);
            }
        });
}

module.exports = {
    generateValidationCode,
    sendValidationCode
}
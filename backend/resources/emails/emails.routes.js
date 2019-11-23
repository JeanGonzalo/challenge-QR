require('dotenv').config();
const express = require('express');
const AWS = require('aws-sdk');
const emailsRoutes = express.Router();

// SEND QR EMAIL
emailsRoutes.post('/send', async (req, res) => {
    // Set the region 
    // Amazon SES configuration
    const SESConfig = {
        apiVersion: '2010-12-01',
        accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
        region: process.env.AWS_SES_REGION
    };

    // Create sendEmail params 
    var params = {
        Source: 'krowdy.alertas@gmail.com',
        Destination: {
            ToAddresses: [
                'krowdy.alertas@gmail.com'
            ]
        },
        ReplyToAddresses: [
            'krowdy.alertas@gmail.com',
        ],
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: ` <p>Estimado Nombres, </p>
                            <p>Hemos confirmado tu registro al evento, te enviamos el resumen y el código QR que tendrás que presentar al ingresar.</p>
                            <p><strong>Nombres: </strong>Nombres</p>
                            <p><strong>Apellidos: </strong>Apellidos</p>
                            <p><strong>DNI: </strong>Dni</p>
                            <img src="http://api.qrserver.com/v1/create-qr-code/?data=48177445&size=500x500" alt="Código QR" height="300" width="300">
                            <p><small>No olvides presentar el código QR al ingresar al evento.</small></p>`
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Tu entrada al evento'
            }
        }
    };

    // Handle promise's fulfilled/rejected states
    new AWS.SES(SESConfig).sendEmail(params).promise()
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.error(err, err.stack);
        });

    res.json('Se envió el correo satisfactoriamente.');
});

module.exports = emailsRoutes;

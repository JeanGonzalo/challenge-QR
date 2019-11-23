const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AWS = require('aws-sdk');

const validateUsers = require('./users.validate');
const processError = require('../lib/errorHandler').processError;
const { UserNotFound } = require('./users.error');

const config = require('../../config')
const logger = require('../lib/logger');
let users = require('../../db').users;
const userController = require('./users.controller');
let { generateValidationCode, sendValidationCode } = require('../lib/sms');

const usersRoutes = express.Router();

// READ
usersRoutes.get('/', processError(async (req, res) => {
  let users = await userController.getUsers();
  logger.info('Se envió correctamente los usuarios', `total: ${users.length}`);
  res.json(users);
}));

//CREATE
usersRoutes.post('/', validateUsers, processError(async (req, res) => {
  const hp = bcrypt.hashSync(req.body.password, 10);
  const validationCode = generateValidationCode(); // Generar código para envío de SMS
  const newUser = { ...req.body, password: hp, validationCode, validationStatus: 'pending' };
  await userController.create(newUser);
  sendValidationCode(newUser.cellphone); //Enviar código de validación por SMS 

  res.json('Se creó correctamente el usuario, te hemos enviado un SMS para validar la cuenta.');
  logger.info('Se ha creado correctamente el usuario: ', newUser.id);

}));

// UPDATE
usersRoutes.put('/:id', validateUsers, processError(async (req, res) => {
  let user = await userController.get(req.params.id);
  if (user === null) throw new UserNotFound('El usuario no existe.');
  await userController.update(req.params.id, req.body)

  res.json('Se actualizó correctamente el usuario.');
  logger.info('Se actualizó correctamente el usuario.');
}));

// VALIDATE
usersRoutes.post('/validate', async (req, res) => {
  const username = req.body.username;
  const validationCode = req.body.validationCode;

  // Buscar usuario en la BD
  const user = await userController.getUserByUsername({ username });

  if (user.validationCode === validationCode) {
    await userController.updateUser(user._id, { validationStatus: 'validated' });

    res.json('La cuenta del usuario ha sido verificada')
    logger.info('La cuenta del usuario ha sido verificada', user.id);

  } else {
    res.status(401).send('El código ingresado no es correcto');
    logger.error('Se ingresó un código de validación incorrecto ', user.id);
  }
})

//LOGIN
usersRoutes.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = users.filter(user => user.username === username)[0]

  const isAuthenticated = bcrypt.compareSync(password, user.password);

  if (isAuthenticated) {
    const token = jwt.sign({ id: user.id }, config.SECRET_KEY, { expiresIn: config.EXPIRES_IN })

    res.json({ token });
    logger.info('Se autentico al usuario', user.id);

  } else {
    res.status(401).send('Verifica tu password');
    logger.error('Verifica tu password');
  }
})

//SUBIR IMAGEN
usersRoutes.get('/signed-url-put-object', async (req, res) => {
  AWS.config.update({
    accessKeyId: 'AAAAAAAAAAAAAAAA', // Borrado
    secretAccessKey: 'J21//xxxxxxxxxxx', // Borrado
    region: 'sa-east-1',
    signatureVersion: 'v4',
  });

  const params = {
    Bucket: 'your-bucket-name',
    Key: 'my-awesome-object.webm',
    Expires: 30 * 60, // 30 minutes
    ContentType: 'video/webm'
  };
  const options = {
    signatureVersion: 'v4',
    region: 'eu-west-1', // same as your bucket
    endpoint: new AWS.Endpoint('your-bucket-name.s3-accelerate.amazonaws.com'), useAccelerateEndpoint: true,
  }
  const client = new AWS.S3(options);
  const signedURL = await (new Promise((resolve, reject) => {
    client.getSignedUrl('putObject', params, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    });
  }));

  return res.json({
    signedURL,
  })
})

module.exports = usersRoutes;

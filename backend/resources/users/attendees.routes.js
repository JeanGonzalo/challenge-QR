const express = require('express');
const AWS = require('aws-sdk');

const config = require('../../config')

const atendeesController = require('./attendees.controller');
const validateAttendee = require('./attendees.validate');// TODO: Verificar si se necesita

const attendeesRoutes = express.Router();


//CREATE
attendeesRoutes.post('/', async (req, res) => {
  const newAttendee = req.body;
  await atendeesController.create(newAttendee);

  res.json('Se creó correctamente el participante.');
  logger.info('Se ha creado correctamente el usuario: ', newAttendee);

});

module.exports = attendeesRoutes;

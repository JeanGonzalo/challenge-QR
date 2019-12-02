const express = require('express');
const AWS = require('aws-sdk');

const config = require('../../config');
const sendEmail = require('../lib/email');
const logger = require('../lib/logger');
const atendeesController = require('./attendees.controller');
const attendeesRoutes = express.Router();

// GET
// Get all attendees in DB.
attendeesRoutes.get('/', async (req, res) => {
  let attendees = await atendeesController.getAttendees();
  res.json(attendees);
  logger.info('Se han obtenido todos los asistentes.');
});

// CREATE
// Create a new attendee in DB.
attendeesRoutes.post('/', async (req, res) => {
  const newAttendee = req.body;
  await atendeesController.create(newAttendee);
  sendEmail(newAttendee.email); // Enviar email de confirmación

  res.json(newAttendee);
  logger.info('Se ha creado correctamente al asistente: ', newAttendee);

});

// UPDATE
// Update the assistance property. (set true)
attendeesRoutes.put('/:dni', async (req, res) => {
  let dni = req.params.dni;
  let result = await atendeesController.update(dni, { assistance: true });

  if (!result) return res.json("El usuario no está registrado.");

  res.json(result);
  logger.info('Se ha actualizado correctamente al asistente: ', result);

});

module.exports = attendeesRoutes;

const express = require('express');
const AWS = require('aws-sdk');

const config = require('../../config')
const atendeesController = require('./attendees.controller');
const attendeesRoutes = express.Router();

// GET
// Get all attendees in DB.
attendeesRoutes.get('/', async (req, res) => {
  let attendees = await atendeesController.getAttendees();
  res.json(attendees);
});

// CREATE
// Create a new attendee in DB.
attendeesRoutes.post('/', async (req, res) => {
  const newAttendee = req.body;
  await atendeesController.create(newAttendee);

  res.json(newAttendee);
  logger.info('Se ha creado correctamente el usuario: ', newAttendee);

});

// UPDATE
// Update the assistance property. (set true)
attendeesRoutes.put('/:dni', async (req, res) => {
  let dni = req.params.dni;
  let result = await atendeesController.update(dni, { assistance: true });

  if (!result) return res.json("El usuario no está registrado.");

  console.log('actualizado correctamente');
  res.json(result);

});

module.exports = attendeesRoutes;

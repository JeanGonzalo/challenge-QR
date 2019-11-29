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

  res.json(newAttendee);
  logger.info('Se ha creado correctamente el usuario: ', newAttendee);

});

attendeesRoutes.get('/users', async (req, res) => {
  let attendees = await atendeesController.getAttendees();
  res.json(attendees);
})

attendeesRoutes.put('/:dni', async (req, res) => {
  let dni = req.params.dni;

  let result = await atendeesController.update(dni, { assistance: true });

  if (!result) {
    console.log('El usuario no está registrado.');
    res.json("El usuario no está registrado.");
  }
  else {
    console.log('actualizado correctamente');
    res.json(result);
  }



})




module.exports = attendeesRoutes;

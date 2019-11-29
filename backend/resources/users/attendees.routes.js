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
  let dniAttendes = req.param.dni;
  let userSearch = await atendeesController.getByDni(dniAttendes);

  if (userSearch === null) {
    console.log('User no exist')
  }

  let result = await atendeesController.update(dniAttendes, { assistance: true });
  console.log('actualizado correctamente');
  res.json(result);


})




module.exports = attendeesRoutes;

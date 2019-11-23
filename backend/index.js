const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('./config');
const emailRoutes = require('./resources/emails/emails.routes');
const attendeeRoutes = require('./resources/users/attendees.routes');

const app = express();
app.use(bodyParser.json());

// Conexiòn a Mongo Atlas
mongoose.connect('mongodb+srv://krowdy123:krowdy123@challenge-qr-kspon.gcp.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });
mongoose.connection.on('error', (error) => {
  console.log('==========================')
  logger.error(error);
  logger.error('Fallo la conexion a mongodb');
  process.exit(1);
});


app.use('/emails', emailRoutes);
app.use('/attendees', attendeeRoutes);

app.listen(config.PORT, () => {
  console.log(`Nuestra app esta escuchando el puerto ${config.PORT}`);
})

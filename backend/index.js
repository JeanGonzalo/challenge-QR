const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');
const emailRoutes = require('./resources/emails/emails.routes')

const app = express();
app.use(bodyParser.json());

app.use('/emails', emailRoutes);

app.listen(config.PORT, () => {
  console.log(`Nuestra app esta escuchando el puerto ${config.PORT}`);
})

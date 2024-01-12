const express = require('express');
var bodyParser = require('body-parser')
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const eventRoute = require('./routes/eventRoutes');

//Import Routes 
const authRoute = require('./routes/auth');

dotenv.config();

//Connect to DB
mongoose.connect(process.env.CONNECT_DB);

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
  });
  
  mongoose.connection.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err);
  });

//Middlewares
app.use(bodyParser.json());





//Route Middlwares
app.use('/api/user/',authRoute);
app.use('/api/events',eventRoute);


app.listen(3000 , () => console.log('Server is Up and running '));
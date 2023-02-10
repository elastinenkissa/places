require('dotenv').config();
require('express-async-errors');
 
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const placesRoute = require('./routes/places');
const usersRoute = require('./routes/users');
const HttpError = require('./models/error');

const { MONGODB_URI, PORT } = require('./util/config');
const { errorHandler } = require('./util/middleware');

const app = express();

app.use(express.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use(cors());

app.use(express.static('build'));

app.use('/api/places', placesRoute);

app.use('/api/users', usersRoute);

app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, 'build/index.html'));
});

app.use(errorHandler);

mongoose
  .connect(MONGODB_URI)
  .then((db) => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    console.log(`Connected to the database "${db.connections[0].name}"`);
  })
  .catch((error) => {
    console.log(error);
  });

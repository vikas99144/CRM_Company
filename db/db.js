
'use strict'

const dbConfig = require('../config/dev.json');
const mongoose = require('mongoose');

module.exports.configure = async () => {
  mongoose.connect(process.env.DB_URL);
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error'));
  db.once('open', function callback() {
    require('./schema')
    console.log('Connection with database succeeded.');
  });

  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });
}




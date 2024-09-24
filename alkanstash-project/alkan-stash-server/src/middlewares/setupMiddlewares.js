const cors = require('cors');
const helmet = require('helmet');
const express = require('express');

const setupMiddlewares = (app) => {
  app.use(cors());
  app.use(helmet());
  app.use(express.json());
};

module.exports = setupMiddlewares;

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const connectDB = require('./utils/connectDB');
const setupMiddlewares = require('./middlewares/setupMiddlewares');
const routes = require('./routes');
const { swaggerUi, swaggerSpec } = require('./swaggerConfig');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB first, then start the server
connectDB()
  .then(() => {
    // Middleware setup
    setupMiddlewares(app);

    // Setup routes
    routes(app);

    // Generic route
    app.get('/', (req, res) => {
      res.send('Hello World, Welcome to Alkanstash!');
    });

    // Swagger setup
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); 
  });

  // Conditionally export the app for testing
if (process.env.NODE_ENV === 'test') {
  module.exports = app; 
}
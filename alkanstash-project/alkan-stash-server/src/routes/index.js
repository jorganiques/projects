const savingsJarRoutes = require('./savingsJarRoutes');
const authRoutes = require('./authRoutes');
const transactionRoutes = require('./transactionRoutes');

const setupRoutes = (app) => {
  app.use('/api/jars', savingsJarRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/transactions', transactionRoutes);
};

module.exports = setupRoutes;

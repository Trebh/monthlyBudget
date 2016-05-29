/**
 * Main application routes
 */

'use strict';

module.exports = function(app) {

  app.use('/api/budgets', require('./api/budgets'));
  app.use('/api/users', require('./api/users'));
  app.use('/api/auth', require('./api/auth'));

};

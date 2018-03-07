'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://127.0.0.1/starling-dev'
  },

  // Sequelize connection opions
  sequelize: {
    uri: 'postgres://postgres:postgres@localhost:5432/sqlmdb',
    options: {
      logging: false,
      //storage: 'dev.sqlite',
      define: {
        timestamps: false
      }
    }
  },

  // Seed database on startup
  seedDB: true

};

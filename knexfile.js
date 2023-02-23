const nodemon = require("nodemon");
require('dotenv').config();

module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host : process.env.DB_HOST,
      port : process.env.DB_PORT,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_DATABASE,
    },
  migrations: {
    directory: './src/database/migrations'
  },
  seeds: {
    directory: './src/database/seeds'
  },
  useNullAsDefault: true,
  },

  test: {
    client: 'mysql',
    connection: {
      host : process.env.HEROKU_DB_HOST,
      port : process.env.HEROKU_DB_PORT,
      user : process.env.HEROKU_DB_USER,
      password : process.env.HEROKU_DB_PASSWORD,
      database : process.env.HEROKU_DB_DATABASE,
    },
  migrations: {
    directory: './src/database/migrations'
  },
  seeds: {
    directory: './src/database/seeds'
  },
  useNullAsDefault: true,
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};

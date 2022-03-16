require("dotenv").config();
const PostgresConnectionStringParser = require("pg-connection-string");

const databaseUrl = process.env.DATABASE_URL;
const connectionOptions = PostgresConnectionStringParser.parse(databaseUrl);
console.log(connectionOptions)
module.exports = {
  development: {
    dialect: "postgres",
    host: connectionOptions.host,
    username: connectionOptions.user,
    password: connectionOptions.password,
    database: connectionOptions.database,
    port: connectionOptions.port,
    dialectoptions: {
      useUTC: false,
      ssl: true
    },
    timezone: "-03:00",
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  },
  test: {
    dialect: "postgres",
    host: connectionOptions.host,
    username: connectionOptions.user,
    password: connectionOptions.password,
    database: connectionOptions.database,
    port: connectionOptions.port,
    dialectoptions: {
      useUTC: false,
      ssl: true
    },
    timezone: "-03:00",
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  },
  production: {
    dialect: "postgres",
    host: connectionOptions.host,
    username: connectionOptions.user,
    password: connectionOptions.password,
    database: connectionOptions.database,
    port: connectionOptions.port,
    dialectoptions: {
      useUTC: false,
      ssl: {
        rejectUnauthorized: false
      }
    },
    timezone: "-03:00",
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  },
};

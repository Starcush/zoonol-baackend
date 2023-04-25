import knex from 'knex';
import fs from 'fs';
import path from 'path';

const {
  DATABASE_HOST,
  DATABASE_USER_NAME,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_CA_FILENAME,
} = process.env;

const dbConfig = {
  client: 'mysql',
  connection: {
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    user: DATABASE_USER_NAME,
    database: DATABASE_NAME,
    password: DATABASE_PASSWORD,
  },
};

if (DATABASE_CA_FILENAME) {
  dbConfig.connection.ssl = {
    ca: fs.readFileSync(
      path.join(__dirname, `../resources/${DATABASE_CA_FILENAME}`)
    ),
  };
}

const db = knex(dbConfig);

export default db;

const config = require('config')
require('dotenv').config();

const env = process.env.NODE_ENV || 'development';
const dialect = 'postgres';
let dbUrl = config.get(dialect);
dbUrl = process.env[dbUrl]

module.exports = {
  [env]: {
    dialect,
    url: dbUrl,
    migrationStorageTableName: '_migrations'
  }
};
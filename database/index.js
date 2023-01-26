require('dotenv/config');

const { migrate } = require('postgres-migrations');
const pg = require('pg');
const path = require('path');

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL
});

client.connect()
  .then(() => {
    return migrate({ client }, path.join(__dirname, 'migrations'));
  })
  .finally(() => client.end());

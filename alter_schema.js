require('dotenv').config({ path: './.env.local' });
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.POSTGRESQL_URI,
});

async function alterSchema() {
  try {
    console.log('Connecting to PostgreSQL with URI:', process.env.POSTGRESQL_URI);
    await client.connect();
    await client.query(`
      ALTER TABLE movies
      ADD COLUMN IF NOT EXISTS metacritic INT;
    `);
    console.log('Schema altered successfully: metacritic column added to movies table.');
  } catch (err) {
    console.error('Error altering schema:', err);
  } finally {
    await client.end();
  }
}

alterSchema();

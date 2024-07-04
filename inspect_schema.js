require('dotenv').config({ path: './.env.local' });
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.POSTGRESQL_URI,
});

async function inspectSchema() {
  try {
    console.log('Connecting to PostgreSQL with URI:', process.env.POSTGRESQL_URI);
    await client.connect();
    const res = await client.query(`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = 'movies';
    `);
    console.log('Schema of movies table:', res.rows);
  } catch (err) {
    console.error('Error inspecting schema:', err);
  } finally {
    await client.end();
  }
}

inspectSchema();

import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

if (!process.env.POSTGRESQL_URI) {
  throw new Error('Invalid/Missing environment variable: "POSTGRESQL_URI"');
}

const uri = process.env.POSTGRESQL_URI;
const pool = new Pool({
  connectionString: uri,
  ssl: {
    rejectUnauthorized: false,
  },
});

const db = drizzle(pool);

export default db;

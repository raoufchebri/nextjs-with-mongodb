const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL
});

async function verifyTables() {
    try {
        console.log('Connecting to the database...');
        await client.connect();
        console.log('Connected to the database.');

        const moviesTableQuery = 'SELECT * FROM information_schema.tables WHERE table_name = \'movies\'';
        const castsTableQuery = 'SELECT * FROM information_schema.tables WHERE table_name = \'casts\'';

        console.log('Verifying movies table...');
        const moviesTableResult = await client.query(moviesTableQuery);
        if (moviesTableResult.rows.length > 0) {
            console.log('Movies table exists.');
        } else {
            console.log('Movies table does not exist.');
        }

        console.log('Verifying casts table...');
        const castsTableResult = await client.query(castsTableQuery);
        if (castsTableResult.rows.length > 0) {
            console.log('Casts table exists.');
        } else {
            console.log('Casts table does not exist.');
        }
    } catch (err) {
        console.error('Error verifying tables:', err);
    } finally {
        await client.end();
        console.log('Database connection closed.');
    }
}

verifyTables();

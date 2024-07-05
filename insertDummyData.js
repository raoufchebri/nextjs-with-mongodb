const { Client } = require('pg');
const client = new Client({
    connectionString: process.env.DATABASE_URL
});

async function insertDummyData() {
    try {
        console.log('Connecting to the database...');
        await client.connect();
        console.log('Connected to the database.');

        const movieInsertText = 'INSERT INTO movies (title, metacritic, plot) VALUES ($1, $2, $3) RETURNING id';
        const movieInsertValues = ['The Great Train Robbery', null, 'A group of bandits stage a brazen train hold-up, only to find a determined posse hot on their heels.'];
        console.log('Inserting movie data...');
        const res = await client.query(movieInsertText, movieInsertValues);
        const movieId = res.rows[0].id;
        console.log('Movie data inserted with ID:', movieId);

        const castInsertText = 'INSERT INTO casts (movie_id, actor_name) VALUES ($1, $2), ($1, $3), ($1, $4), ($1, $5)';
        const castInsertValues = [movieId, 'A.C. Abadie', 'Gilbert M. \'Broncho Billy\' Anderson', 'George Barnes', 'Justus D. Barnes'];
        console.log('Inserting cast data...');
        await client.query(castInsertText, castInsertValues);
        console.log('Cast data inserted.');
    } catch (err) {
        console.error('Error inserting dummy data:', err);
    } finally {
        await client.end();
        console.log('Database connection closed.');
    }
}

console.log('DATABASE_URL:', process.env.DATABASE_URL);
insertDummyData();

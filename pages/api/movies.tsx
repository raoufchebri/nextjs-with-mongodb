import { Pool } from 'pg';
import { NextApiRequest, NextApiResponse } from 'next';

const pool = new Pool({
    connectionString: process.env.POSTGRESQL_URI,
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await pool.connect();
        const result = await client.query(`
            SELECT id, title, metacritic, plot
            FROM movies
            ORDER BY metacritic DESC
            LIMIT 10;
        `);
        const movies = result.rows;
        client.release();
        res.json(movies);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await pool.end();
    }
}

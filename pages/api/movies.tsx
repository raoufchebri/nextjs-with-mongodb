import client from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const result = await client.query(`
            SELECT * FROM movies
            ORDER BY metacritic DESC
            LIMIT 10
        `);
        const movies = result.rows;
        res.json(movies);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

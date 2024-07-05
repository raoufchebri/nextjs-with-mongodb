import { GetStaticProps } from "next";
import { Client } from "pg";

interface Movie {
    _id: string;
    title: string;
    metacritic: number;
    plot: string;
}

interface TopProps {
    movies: Movie[];
}

export default function Top({ movies }: TopProps) {
    return (
        <div>
            <h1>Top 1000 Movies of All Time</h1>
            <p>
                <small>(According to Metacritic)</small>
            </p>
            <ul>
                {movies.map((movie) => (
                    <li key={movie._id}>
                        <h2>{movie.title}</h2>
                        <h3>{movie.metacritic}</h3>
                        <p>{movie.plot}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export const getStaticProps: GetStaticProps<TopProps> = async () => {
    const client = new Client({ connectionString: process.env.POSTGRESQL_URI });
    await client.connect();

    try {
        const res = await client.query(`
            SELECT
                id AS _id,
                title,
                metacritic,
                plot
            FROM movies
            ORDER BY metacritic DESC
            LIMIT 1000;
        `);

        const movies = res.rows;

        return {
            props: { movies },
        };
    } catch (e) {
        console.error(e);
        return {
            props: { movies: [] },
        };
    } finally {
        await client.end();
    }
};

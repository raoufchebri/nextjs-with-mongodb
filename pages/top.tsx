import { Client } from 'pg';
import { GetStaticProps } from "next";

interface Movie {
    id: number;
    title: string;
    metacritic: number;
    plot: string;
    cast: string[];
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
                    <li key={movie.id}>
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
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        await client.connect();
        const res = await client.query(`
            SELECT movies.id, movies.title, movies.metacritic, movies.plot, array_agg(movie_cast_members.name) AS cast
            FROM movies
            LEFT JOIN movie_cast ON movies.id = movie_cast.movie_id
            LEFT JOIN movie_cast_members ON movie_cast.cast_id = movie_cast_members.id
            GROUP BY movies.id
            ORDER BY movies.metacritic DESC
            LIMIT 1000
        `);
        const movies = res.rows;
        await client.end();
        return {
            props: { movies },
        };
    } catch (e) {
        console.error(e);
        await client.end();
        return {
            props: { movies: [] },
        };
    }
};

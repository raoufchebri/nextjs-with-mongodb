import { query } from "../lib/postgresClient";
import { GetStaticProps } from "next";

interface Movie {
    id: string;
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
    try {
        const result = await query(`
            SELECT
                movies.id,
                movies.title,
                movies.metacritic,
                movies.plot
            FROM
                movies
            ORDER BY
                movies.metacritic DESC
            LIMIT 1000;
        `);
        const movies = result.rows;
        return {
            props: { movies: JSON.parse(JSON.stringify(movies)) },
        };
    } catch (e) {
        console.error(e);
        return {
            props: { movies: [] },
        };
    }
};

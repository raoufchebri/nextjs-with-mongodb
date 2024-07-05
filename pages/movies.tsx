import { GetServerSideProps } from 'next';
import { Pool } from 'pg';

interface Movie {
    id: number;
    title: string;
    metacritic: number;
    plot: string;
    cast: string[];
}

interface MoviesProps {
    movies: Movie[];
}

const Movies: React.FC<MoviesProps> = ({ movies }) => {
    return (
        <div>
            <h1>Top 20 Movies of All Time</h1>
            <p>
                <small>(According to Metacritic)</small>
            </p>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        <h2>{movie.title}</h2>
                        <h3>{movie.metacritic}</h3>
                        <p>{movie.plot}</p>
                        <h4>Cast:</h4>
                        <ul>
                            {movie.cast.map((actor, index) => (
                                <li key={index}>{actor}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Movies;

export const getServerSideProps: GetServerSideProps = async () => {
    const pool = new Pool({
        connectionString: process.env.POSTGRESQL_URI,
    });

    try {
        const client = await pool.connect();
        const res = await client.query(`
            SELECT movies.id, movies.title, movies.metacritic, movies.plot, array_agg(cast_members.name) as cast
            FROM movies
            LEFT JOIN cast_members ON movies.id = cast_members.movie_id
            GROUP BY movies.id
            ORDER BY movies.metacritic DESC
            LIMIT 20;
        `);
        const movies = res.rows;
        client.release();
        return {
            props: { movies },
        };
    } catch (e) {
        console.error(e);
        return { props: { movies: [] } };
    } finally {
        await pool.end();
    }
};

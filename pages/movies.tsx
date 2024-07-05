import { query } from "../lib/postgresClient";
import { GetServerSideProps } from 'next';

interface Movie {
    id: string;
    title: string;
    metacritic: number;
    plot: string;
    cast: string[]; // Added cast property
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
    try {
        const result = await query(`
            SELECT
                movies.id,
                movies.title,
                movies.metacritic,
                movies.plot,
                array_agg(cast_members.name) AS cast
            FROM
                movies
            LEFT JOIN
                movie_cast ON movies.id = movie_cast.movie_id
            LEFT JOIN
                cast_members ON movie_cast.cast_member_id = cast_members.id
            GROUP BY
                movies.id
            ORDER BY
                movies.metacritic DESC
            LIMIT 20;
        `);
        const movies = result.rows;
        return {
            props: { movies: JSON.parse(JSON.stringify(movies)) },
        };
    } catch (e) {
        console.error(e);
        return { props: { movies: [] } };
    }
};

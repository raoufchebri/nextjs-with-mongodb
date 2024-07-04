import client from "../lib/mongodb";
import { GetServerSideProps } from 'next';

interface Movie {
    _id: string;
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
                    <li key={movie._id}>
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
        const db = client.db("sample_mflix");
        const movies = await db
            .collection("movies")
            .find({})
            .sort({ metacritic: -1 })
            .limit(20)
            .toArray();
        return {
            props: { movies: JSON.parse(JSON.stringify(movies)) },
        };
    } catch (e) {
        console.error(e);
        return { props: { movies: [] } };
    }
};

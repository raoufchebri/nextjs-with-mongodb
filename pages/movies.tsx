import db from "../lib/postgresql";
import { GetServerSideProps } from 'next';
import { movies } from '../schema/movies';
import { eq } from 'drizzle-orm';

interface Movie {
    id: number;
    title: string;
    plot: string | null;
    genres: string[];
    runtime: number | null;
    poster: string | null;
    fullplot: string | null;
    languages: string[];
    released: Date | null;
    directors: string[];
    rated: string | null;
    awards: {
        wins: number;
        nominations: number;
        text: string;
    };
    lastupdated: Date | null;
    year: number;
    imdb: {
        rating: number;
        votes: number;
        id: number;
    };
    countries: string[];
    type: string;
    tomatoes: {
        viewer: {
            rating: number;
            numReviews: number;
            meter: number;
        };
        fresh: number;
        critic: {
            rating: number;
            numReviews: number;
            meter: number;
        };
        rotten: number;
        lastUpdated: Date | null;
    };
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
                        <p>{movie.plot}</p>
                        <h4>Genres:</h4>
                        <ul>
                            {movie.genres.map((genre, index) => (
                                <li key={index}>{genre}</li>
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
        const moviesData: Movie[] = await db.select({
            id: movies.id,
            title: movies.title,
            plot: movies.plot,
            genres: movies.genres,
            runtime: movies.runtime,
            poster: movies.poster,
            fullplot: movies.fullplot,
            languages: movies.languages,
            released: movies.released,
            directors: movies.directors,
            rated: movies.rated,
            awards: movies.awards,
            lastupdated: movies.lastupdated,
            year: movies.year,
            imdb: movies.imdb,
            countries: movies.countries,
            type: movies.type,
            tomatoes: movies.tomatoes
        }).from(movies).orderBy(movies.id).limit(20);

        return {
            props: { movies: moviesData },
        };
    } catch (e) {
        console.error(e);
        return { props: { movies: [] } };
    }
};

import Head from "next/head";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from 'pg';
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { movies as moviesTable, casts } from '../schema.drizzle';
import { eq, desc } from 'drizzle-orm';
import { Pool } from 'pg';

type ConnectionStatus = {
  isConnected: boolean;
};

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
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  const db = drizzle(client);

  try {
    const moviesData: any = await db
      .select()
      .from(moviesTable)
      .leftJoin(casts, eq(casts.movie_id, moviesTable.id))
      .orderBy(desc(moviesTable.metacritic))
      .limit(20)
      .execute();

    const movies: Movie[] = moviesData.map((movie: any) => ({
      id: movie.movies.id,
      title: movie.movies.title,
      metacritic: movie.movies.metacritic,
      plot: movie.movies.plot,
      cast: movie.casts.map((cast: any) => cast.actor_name),
    }));

    return {
      props: { movies },
    };
  } catch (e) {
    console.error(e);
    return { props: { movies: [] } };
  } finally {
    await client.end();
  }
};

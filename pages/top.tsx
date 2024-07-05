import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from 'pg';
import { GetStaticProps } from "next";
import { movies as moviesTable, casts } from '../schema.drizzle';
import { eq, desc } from 'drizzle-orm';

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
    await client.connect();
    const db = drizzle(client);

    try {
        const moviesData: any = await db
            .select()
            .from(moviesTable)
            .leftJoin(casts, eq(casts.movie_id, moviesTable.id))
            .orderBy(desc(moviesTable.metacritic))
            .limit(1000)
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
        return {
            props: { movies: [] },
        };
    } finally {
        await client.end();
    }
};

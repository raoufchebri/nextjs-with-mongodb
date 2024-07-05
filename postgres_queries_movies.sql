-- PostgreSQL queries for movies.tsx

-- Query to fetch top 20 movies sorted by metacritic score
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

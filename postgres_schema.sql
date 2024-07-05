-- PostgreSQL schema for movies and cast members

-- Create movies table
CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    metacritic INTEGER,
    plot TEXT
);

-- Create cast_members table
CREATE TABLE cast_members (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    movie_id INTEGER REFERENCES movies(id)
);

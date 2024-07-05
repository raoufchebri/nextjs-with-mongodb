-- PostgreSQL schema for movies and cast members

-- Create movies table
CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    metacritic INT,
    plot TEXT,
    poster VARCHAR(255),
    fullplot TEXT,
    languages VARCHAR(255)[],
    released DATE,
    directors VARCHAR(255)[],
    rated VARCHAR(50),
    awards JSONB,
    lastupdated TIMESTAMP,
    year INT,
    imdb JSONB,
    countries VARCHAR(255)[],
    type VARCHAR(50),
    tomatoes JSONB,
    num_mflix_comments INT
);

-- Create cast members table
CREATE TABLE cast_members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Create junction table for many-to-many relationship between movies and cast members
CREATE TABLE movie_cast (
    movie_id INT REFERENCES movies(id) ON DELETE CASCADE,
    cast_member_id INT REFERENCES cast_members(id) ON DELETE CASCADE,
    PRIMARY KEY (movie_id, cast_member_id)
);

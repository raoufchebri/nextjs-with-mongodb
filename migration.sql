-- Create movies table
CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    metacritic INT,
    plot TEXT
);

-- Create movie_cast_members table
CREATE TABLE movie_cast_members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Create movie_cast junction table
CREATE TABLE movie_cast (
    movie_id INT REFERENCES movies(id) ON DELETE CASCADE,
    cast_id INT REFERENCES movie_cast_members(id) ON DELETE CASCADE,
    PRIMARY KEY (movie_id, cast_id)
);

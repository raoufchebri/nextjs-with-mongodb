CREATE TABLE casts (
    id SERIAL PRIMARY KEY,
    movie_id INTEGER NOT NULL,
    actor_name TEXT NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE
);
